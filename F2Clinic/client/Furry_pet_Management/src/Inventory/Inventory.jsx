import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import backgroundImage from "../assets/backadmin.jpg";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../AdminSidebar/Sidebar.jsx";
import Navbar from "../AdminNav/Navbar.jsx";

const Inventory = () => {
  const navigate = useNavigate();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    Category: "",
    Quantity: "",
    Description: "",
    imagePath: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageURL = await uploadImage(formData.imageFile);
      const formDataWithImage = {
        ...formData,
        imagePath: imageURL,
      };
      const requestData = JSON.stringify(formDataWithImage);
      const response = await axios.post(
        "http://localhost:3000/api/inventoryadd",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Inventory item added successfully:", response.data);
      toast.success("Inventory item added successfully!", {
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/Viewinventory");
      }, 3000);
    } catch (error) {
      console.error("Error posting inventory data:", error);
      setIsLoading(false);

      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add inventory item. Please try again.");
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const uploadImage = async (imageFile) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(imageFile.name);
    console.log("Uploading Image...");
    try {
      const snapshot = await fileRef.put(imageFile);
      const url = await snapshot.ref.getDownloadURL();
      console.log("Image uploaded successfully:", url);
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
      throw error;
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageFile: selectedFile,
      }));
    } else {
      console.log("No file selected");
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-2xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-10 rounded-lg shadow-lg mb-20"
            >
              <h2 className="text-black text-2xl font-bold text-center mb-8">
                Add New Item
              </h2>
              <div className="flex flex-col mb-6">
                <label htmlFor="itemName" className="text-black mb-2">
                  Item Name :
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="w-full p-3 border border-light-gray bg-gray-200 rounded-lg"
                />
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="category" className="text-black mb-2">
                  Category:
                </label>
                <select
                  id="category"
                  name="Category"
                  value={formData.Category}
                  onChange={handleChange}
                  className="w-full p-3 border border-light-gray bg-gray-200 rounded-lg"
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
              <div className="flex flex-col mb-6">
                <label htmlFor="quantity" className="text-black mb-2">
                  Quantity :
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="Quantity"
                  value={formData.Quantity}
                  onChange={handleChange}
                  className="w-full p-3 border border-light-gray bg-gray-200 rounded-lg"
                />
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="description" className="text-black mb-2">
                  Description :
                </label>
                <textarea
                  id="description"
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-light-gray bg-gray-200 rounded-lg"
                ></textarea>
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="image" className="text-black mb-2">
                  Image :
                </label>
                <input
                  type="file"
                  id="image"
                  name="imagePath"
                  onChange={handleFileUpload}
                  className="w-full p-3 border border-light-gray bg-gray-200 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center block mx-auto"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Inventory;
