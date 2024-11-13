import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PetRecordsvg from "../PetRecordSvg/PetRecordsvg";
import SubmitButton from "../SubmitButton/SubmitButton";
import { addPetRecords } from "../../../Api/config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PetRecordContent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Petname: "",
    Petimage: "",
    Breed: "",
    Age: "",
  });

  const [img, setImg] = useState(null);

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
    const storageRef = ref(storage, `PetRecords/${file.name}`);
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
        toast.error("Error uploading image. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFormData((prevData) => ({
            ...prevData,
            Petimage: downloadURL,
          }));
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.Petimage) {
      toast.error("Image upload is in progress. Please wait.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    const PetRecordData = {
      Petname: formData.Petname,
      Petimage: formData.Petimage,
      Breed: formData.Breed,
      Age: formData.Age,
    };

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    addPetRecords(PetRecordData)
      .then((response) => {
        clearTimeout(timeoutId);
        setLoading(false);
        console.log("Pet Records added successfully:", response);
        toast.success("Pet Records added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/customerdashboard");
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        setLoading(false);
        console.error("Error adding Pet Records:", error);
        toast.error("Error adding Pet Records.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="w-full min-h-screen flex ml-10 items-center justify-center">
      <ToastContainer position="top-right" />
      <div className="flex w-full max-w-5xl flex-col lg:flex-row">
        <PetRecordsvg />
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] h-auto py-20 rounded-xl ml-10 mt-8 lg:mt-0"
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
              Fill in your Pet's Details
            </p>
          </div>
          <form
            className="w-full h-auto flex flex-col items-center gap-7 px-10"
            onSubmit={handleSubmit}
          >
            <div className="w-full relative">
              <label className="text-white font-semibold">Pet Name</label>
              <input
                type="text"
                name="Petname"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your pet's name"
                value={formData.Petname}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Pet Image</label>
              <input
                type="file"
                accept="image/*"
                name="Petimage"
                onChange={handleImageChange}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Age</label>
              <input
                type="number"
                name="Age"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your pet's age"
                value={formData.Age}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Breed</label>
              <input
                type="text"
                name="Breed"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your pet's breed"
                value={formData.Breed}
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

export default PetRecordContent;
