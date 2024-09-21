import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function pdf({ inventoryData }) {
  const [logoUrl, setLogoUrl] = useState("");

  // Function to fetch company logo from Firebase Storage
  const fetchLogo = async () => {
    try {
      // Assuming 'logo.png' is the name of your logo file in Firebase Storage
      const storageRef = firebase.storage().ref();
      const logoRef = storageRef.child("logo.png");
      const url = await logoRef.getDownloadURL();
      setLogoUrl(url);
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  };

  const generatePDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set document properties
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Add company logo
    if (logoUrl) {
      doc.addImage(logoUrl, "PNG", 15, 15, 50, 20); // Adjust position and size as needed
    }

    // Add header with inventory details
    doc.text("Inventory Details", 15, 50);

    // Add inventory details to the PDF
    const tableData = inventoryData.map((item, index) => [
      index + 1,
      item.itemName,
      item.Category,
      item.Quantity,
      item.Description,
    ]);

    // Set table styling
    doc.autoTable({
      head: [["#", "Item Name", "Category", "Quantity", "Description"]],
      body: tableData,
      startY: 60,
      theme: "striped",
      styles: { cellPadding: 4, fontSize: 10 },
    });

    // Save the PDF
    doc.save("inventory_details.pdf");
  };

  return (
    <div>
      <button
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          fetchLogo();
          generatePDF();
        }}
      >
        Generate PDF{" "}
      </button>{" "}
    </div>
  );
}

export default pdf;
