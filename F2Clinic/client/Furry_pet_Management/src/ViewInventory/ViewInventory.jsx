import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/backadmin.jpg";
import "./Viewinventory.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import {
  PDFViewer,
  Document,
  Page,
  pdf,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import Navbar from "../AdminNav/Navbar";
import Sidebar from "../AdminSidebar/Sidebar";
const Viewinventory = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/inventory");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setInventoryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePDFDownnload = async (id, itemName, category, description) => {
    // Generate PDF content
    console.log("geneareting PDF" + category);
    const pdfContent = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.headerSection}>
              <Image src={Logo} style={styles.logo} />
              <Text style={styles.header}>Inventory Data</Text>
            </View>
            <hr />
            <View style={styles.infoSection}>
              <View style={styles.table}>
                <View style={styles.row}>
                  <View style={styles.colLabel}>
                    <Text style={styles.label}>ID:</Text>
                  </View>
                  <View style={styles.colValue}>
                    <Text style={styles.text}>#{id}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.colLabel}>
                    <Text style={styles.label}>Item:</Text>
                  </View>
                  <View style={styles.colValue}>
                    <Text style={styles.text}>{itemName}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.colLabel}>
                    <Text style={styles.label}>Status:</Text>
                  </View>
                  <View style={styles.colValue}>
                    <Text style={styles.text}>{category}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.colLabel}>
                    <Text style={styles.label}>Description:</Text>
                  </View>
                  <View style={styles.colValue}>
                    <Text style={styles.text}>{description}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
    console.log(pdfContent.toString());

    const blob = await pdf(pdfContent).toBlob();

    // Download PDF
    saveAs(blob, ` ${itemName} Inventory Data.pdf`);
  };

  const handleDelete = async (inventoryItem) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/inventory/${inventoryItem._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete inventory item");
      }

      // Update local state only after successful deletion from server
      setInventoryData((prevData) =>
        prevData.filter((item) => item._id !== inventoryItem._id)
      );

      // Display success toast with a timeout
      toast.success("Inventory item deleted successfully", {
        autoClose: 3000, // Close after 3 seconds
      });
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      toast.error(error.message); // Display error toast message
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/inventory/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch inventory details");
      }
      const item = await response.json();

      // Check if item has required properties
      if (
        !item.itemName ||
        !item.Category ||
        !item.Quantity ||
        !item.Description
      ) {
        throw new Error("Invalid item data");
      }

      // Add logo to PDF
      const logoUrl =
        "https://firebasestorage.googleapis.com/v0/b/furrypetclinic.appspot.com/o/logo.png?alt=media&token=b5630494-77ec-486a-9374-8611de5f0756";
      const logoResponse = await fetch(logoUrl);
      if (!logoResponse.ok) {
        throw new Error("Failed to load logo image");
      }
      const logoBlob = await logoResponse.blob();

      const doc = new jsPDF();
      doc.addImage(logoBlob, "PNG", 10, 10, 40, 40);

      // Customize the PDF layout
      doc.setFontSize(14);
      doc.setTextColor("#000000");
      doc.text(`Item Name: ${item.itemName}`, 10, 60);
      doc.text(`Category: ${item.Category}`, 10, 70);
      doc.text(`Quantity: ${item.Quantity}`, 10, 80);
      doc.text(`Description: ${item.Description}`, 10, 90);
      doc.save(`inventory_${item._id}.pdf`);
      console.log("PDF generated successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div
        className="flex"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Sidebar />
        <div className="flex flex-col items-center w-full ml-3 mt-9 mr-3">
          <div className="text-center">
            <h1
              className="text-2xl font-bold mb-4 text-white"
              style={{ fontFamily: "monospace", fontSize: "30px" }}
            >
              View Inventory
            </h1>
          </div>
          <div className="flex flex-row w-full justify-center">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th className="text-center">Image</th>
                  <th className="text-center">Item Name</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Description</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item, index) => (
                  <tr key={index}>
                    <td className="flex justify-center items-center mt-4">
                      {item.imagePath && (
                        <img
                          src={item.imagePath}
                          alt="Item"
                          className="item-image"
                          width="150px"
                        />
                      )}
                    </td>
                    <td className="text-white text-center">{item.itemName}</td>
                    <td className="text-white text-center">{item.Category}</td>
                    <td className="text-white text-center">{item.Quantity}</td>
                    <td className="text-white text-center">
                      {item.Description}
                    </td>
                    <td>
                      <div className="button-container-view">
                        <button
                          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleDelete(item)}
                          disabled={isLoading}
                        >
                          {isLoading ? "Deleting..." : "Delete"}
                        </button>
                        <Link to={`/UpdateInventory/${item._id}`}>
                          <button className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 mr-2 px-4 rounded">
                            Update
                          </button>
                        </Link>
                        <button
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            handlePDFDownnload(
                              item._id,
                              item.itemName,
                              item.Category,
                              item.description
                            )
                          }
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 60,
    border: "1px solid #000",
  },
  section: {
    marginBottom: 10,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: "extrabold",
    marginBottom: 10,
  },
  infoSection: {
    marginBottom: 20,
  },
  table: {
    border: "1px solid #000",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
  },
  colLabel: {
    width: "50%",
    borderRight: "1px solid #000",
    padding: 5,
  },
  colValue: {
    width: "40%",
    padding: 5,
  },
  label: {
    fontWeight: "bold",
  },
  text: {},
});

export default Viewinventory;
