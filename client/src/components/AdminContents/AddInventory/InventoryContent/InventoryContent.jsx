import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InventorySVG from "../../InventorySVG/InventorySVG";
import SubmitButton from "./SubmitButton/SubmitButton";
import { addInventory } from "@/Api/config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../Firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const InventoryContent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ItemName: "",
    Category: "",
    Quantity: "",
    imagepath: null,
    Description: "",
  });

  const [imgUrl, setImgUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  useEffect(() => {
    if (img) {
      uploadFile(img);
    }
  }, [img]);

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `Inventory/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error during upload:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImgUrl(downloadURL);
          localStorage.setItem("imgUrl", downloadURL);
          setFormData((prevData) => ({
            ...prevData,
            imagepath: downloadURL,
          }));

          handleSubmit();
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.imagepath) {
      toast.error("Image upload is in progress. Please wait.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    const inventoryData = {
      ItemName: formData.ItemName,
      Category: formData.Category,
      Quantity: Number(formData.Quantity),
      imagepath: formData.imagepath,
      Description: formData.Description,
    };

    addInventory(inventoryData)
      .then((response) => {
        console.log("Inventory added successfully:", response);
        toast.success("Inventory added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/admindashboard");
      })
      .catch((error) => {
        console.error("Error adding inventory:", error);
        toast.error("Error adding inventory.", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full min-h-screen flex ml-10 items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-5">
        <InventorySVG />
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-auto py-20 rounded-xl"
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
              <label className="text-white font-semibold">Image</label>
              <input
                type="file"
                name="imagepath"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
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
            <SubmitButton loading={loading}>Submit</SubmitButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default InventoryContent;
