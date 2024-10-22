import React, { useState } from "react";
import { motion } from "framer-motion";
import InventorySVG from "../../InventorySVG/InventorySVG";
import SubmitButton from "./SubmitButton/SubmitButton";

const InventoryContent = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: "",
    imagepath: null,
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      imagepath: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic to handle form submission here (e.g., API calls, form validation)
    console.log(formData);
  };

  return (
    <div className="w-full min-h-screen flex ml-10 items-center justify-center">
      <div className="flex w-full max-w-5xl">
        <InventorySVG />
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          className="w-[60%] h-auto py-20 rounded-xl ml-5"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            boxShadow: "8px 8px 40px rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "2px solid rgba(255, 255, 255, 0.61)",
            zIndex: 999,
          }}
        >
          <div className="w-full h-auto text-center">
            <p className="text-white text-xl font-semibold mb-10">
              Fill in Inventory Details
            </p>
          </div>
          <form
            className="w-full h-auto flex flex-col items-center gap-7 px-10"
            onSubmit={handleSubmit}
          >
            <div className="w-full relative">
              <label className="text-white font-semibold">Item Name</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter the item name"
                required
              />
            </div>

            <div className="w-full relative">
              <label className="text-white font-semibold">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter the category"
                required
              />
            </div>

            <div className="w-full relative">
              <label className="text-white font-semibold">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter the quantity"
                min="1"
                required
              />
            </div>

            <div className="w-full relative">
              <label className="text-white font-semibold">Image</label>
              <input
                type="file"
                name="imagepath"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
              />
            </div>

            <div className="w-full relative">
              <label className="text-white font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter a description"
                rows="4"
              />
            </div>
            <SubmitButton>Submit</SubmitButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default InventoryContent;
