import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import Navbar from "../AdminNav/Navbar.jsx";
import Sidebar from "../AdminSidebar/Sidebar.jsx";
import backgroundImage from "../assets/backadmin.jpg";

const UpdateInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    itemName: "",
    Category: "",
    Quantity: "",
    Description: "",
    imagePath: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = "";

      if (data.imagePath && data.imagePath.files) {
        const storageRef = firebase.storage().ref();
        const imageFileName = `${id}_${Date.now()}`;
        const imageRef = storageRef.child(imageFileName);
        const file = data.imagePath.files[0];

        await imageRef.put(file);
        imageUrl = await imageRef.getDownloadURL();
      }

      const updatedData = {
        itemName: data.itemName,
        Category: data.Category,
        Quantity: data.Quantity,
        Description: data.Description,
        ...(imageUrl && { imagePath: imageUrl }),
      };

      await axios.put(`http://localhost:3000/api/inventory/${id}`, updatedData);

      toast.success("Data updated successfully");
      setTimeout(() => navigate("/Viewinventory"), 1500);
    } catch (error) {
      toast.error("Error updating data. Please try again.");
      console.error("Error updating data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/inventory/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInventoryData();
  }, [id]);

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div
        className="flex-grow flex"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Sidebar />
        <div className="flex items-center justify-center w-full p-4">
          <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mb-20">
            <h2 className="text-xl font-bold text-center mb-8">
              Update New Item
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="itemName" className="block text-gray-700 mb-1">
                  Item Name:
                </label>
                <input
                  type="text"
                  id="itemName"
                  value={data.itemName}
                  onChange={(e) =>
                    setData({ ...data, itemName: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 bg-gray-100 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 mb-1">
                  Category:
                </label>
                <select
                  id="category"
                  value={data.Category}
                  onChange={(e) =>
                    setData({ ...data, Category: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 bg-gray-100 rounded-md"
                >
                  <option value="">Select Category</option>
                  <option value="Medications and Treatments">
                    Medications and Treatments
                  </option>
                  <option value="Pet Food">Pet Food</option>
                  <option value="Grooming Supplies">Grooming Supplies</option>
                  <option value="Pet Accessories">Pet Accessories</option>
                  <option value="Health and Wellness Products">
                    Health and Wellness Products
                  </option>
                  <option value="Diagnostic and Medical Equipment">
                    Diagnostic and Medical Equipment
                  </option>
                  <option value="Pet Care Services">Pet Care Services</option>
                  <option value="Emergency Supplies">Emergency Supplies</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700 mb-1">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={data.Quantity}
                  onChange={(e) =>
                    setData({ ...data, Quantity: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 bg-gray-100 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 mb-1"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  value={data.Description}
                  onChange={(e) =>
                    setData({ ...data, Description: e.target.value })
                  }
                  rows="4"
                  className="w-full p-3 border border-gray-300 bg-gray-100 rounded-md"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="imagePath" className="block text-gray-700 mb-1">
                  Image:
                </label>
                <input
                  type="file"
                  id="imagePath"
                  onChange={(e) => setData({ ...data, imagePath: e.target })}
                  className="w-full p-3 border border-gray-300 bg-gray-100 rounded-md"
                />
              </div>
              <button
                type="submit"
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 hover:bg-blue-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateInventory;
