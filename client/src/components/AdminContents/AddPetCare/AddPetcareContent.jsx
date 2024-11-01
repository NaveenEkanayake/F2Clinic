import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PetRecordsvg from "./AddPetcareSVG/PetCareSVG";
import SubmitButton from "./SubmitButton/SubmitButton";
import { verifyadmin, addPetcareSupply } from "../../../Api/config";
import app from "@/components/Firebase/config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPetCareContent = () => {
  const [formData, setFormData] = useState({
    Supplyname: "",
    SupplyImg: null,
    price: "",
    SupplyDescription: "",
  });
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    const storageRef = ref(storage, `PetCareSupply/${file.name}`);
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
          setFormData((prevData) => ({
            ...prevData,
            SupplyImg: downloadURL,
          }));
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminId = verifyadmin();
    if (!adminId) {
      console.log("Admin ID is required");
      return;
    }

    if (!formData.SupplyImg) {
      toast.error("Image upload is in progress. Please wait.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    const PetcareSupplyData = {
      Supplyname: formData.Supplyname,
      SupplyImg: formData.SupplyImg,
      price: formData.price,
      SupplyDescription: formData.SupplyDescription,
    };

    addPetcareSupply(PetcareSupplyData)
      .then((response) => {
        console.log("PetcareSupplyData added successfully:", response);
        toast.success("PetcareSupplyData added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error adding PetcareSupplyData:", error);
        toast.error("Error adding PetcareSupplyData.", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  return (
    <div className="w-full min-h-screen flex ml-10 items-center justify-center">
      <ToastContainer />
      <div className="flex w-full max-w-5xl">
        <PetRecordsvg />
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
              Fill in Pet Care Supplies Details
            </p>
          </div>
          <form
            className="w-full h-auto flex flex-col items-center gap-7 px-10"
            onSubmit={handleSubmit}
          >
            <div className="w-full relative">
              <label className="text-white font-semibold">Name</label>
              <input
                type="text"
                name="Supplyname"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter the supply name"
                value={formData.Supplyname}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Supply Image</label>
              <input
                type="file"
                accept="image/*"
                name="SupplyImg"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                onChange={handleImageChange}
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Price</label>
              <div className="flex items-center border border-gray-200 rounded-lg bg-transparent">
                <span className="text-white p-3">LKR</span>{" "}
                <input
                  type="text"
                  name="price"
                  className="w-full p-3 rounded-lg border-none bg-transparent text-white focus:outline-none" // Adjusted class for border
                  placeholder="Enter the Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Description</label>
              <textarea
                name="SupplyDescription"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter a description of the supply"
                rows="4"
                value={formData.SupplyDescription}
                onChange={handleInputChange}
              />
            </div>
            <SubmitButton loading={loading}>Submit</SubmitButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPetCareContent;
