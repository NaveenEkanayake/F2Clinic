import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateSVG from "../UpdateInventorySVG/UpdateSVG";
import { getInventoryById, updateInventory } from "../../../Api/config";
import UpdateButton from "../UpdateButton/UpdateButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

const UpdateFormInventoryContents = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ItemName: "",
    Category: "",
    Quantity: "",
    Description: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventoryById(id);
        if (data && data.retrievedData) {
          setFormData(data.retrievedData);
        }
      } catch (error) {
        console.error("Error fetching Inventory data:", error);
        toast.error("Failed to load Inventory data.", { autoClose: 3000 });
      }
    };
    fetchInventory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateInventory(id, formData);
      toast.success("Inventory updated successfully!", { autoClose: 3000 });
      setTimeout(() => {
        setLoading(false);
        navigate("/ViewInventory");
      }, 3000);
    } catch (error) {
      console.error("Error updating Inventory:", error);
      toast.error("Failed to update Inventory.", { autoClose: 3000 });
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex ml-10 items-center justify-center">
      <ToastContainer />
      <div className="flex w-full max-w-5xl">
        <UpdateSVG />
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
              Update Inventory Details
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
                name="ItemName"
                value={formData.ItemName}
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
                name="Category"
                value={formData.Category}
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
                name="Quantity"
                value={formData.Quantity}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter the quantity"
                min="1"
                required
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Description</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter a description"
                rows="4"
              />
            </div>
            <UpdateButton loading={loading}>Submit</UpdateButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateFormInventoryContents;
