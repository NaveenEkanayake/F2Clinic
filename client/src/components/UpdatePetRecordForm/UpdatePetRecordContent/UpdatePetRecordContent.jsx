import React, { useState, useEffect } from "react";
import UpdatePetRecordSVG from "../UpdatePetRecordSVG/UpdatePetRecordSVG";
import UpdateButton from "../UpdateButton/UpdateButton";
import { UpdatePetRecord, getPetRecordById } from "../../../Api/config";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

const UpdatePetRecordContent = () => {
  const [formData, setFormData] = useState({
    Petname: "",
    Breed: "",
    Age: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPetRecordID = async () => {
      try {
        const data = await getPetRecordById(id);
        if (data) {
          setFormData(data);
        } else {
          toast.error("No data found for this pet record.", {
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
        toast.error("Failed to load pet data.", { autoClose: 3000 });
      }
    };
    fetchPetRecordID();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await UpdatePetRecord(id, formData);
      toast.success("Pet Record updated successfully!", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/viewpetRecord");
      }, 3000);
    } catch (error) {
      console.error("Error updating Pet Record:", error);
      toast.error("Failed to update Pet Record.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex ml-10 items-center justify-center">
      <ToastContainer position="top-right" />
      <div className="flex w-full max-w-5xl">
        <UpdatePetRecordSVG />
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          className="w-[60%] h-auto py-20 rounded-xl ml-10"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            boxShadow: "8px 8px 40px rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(6px)",
            border: "2px solid rgba(255, 255, 255, 0.61)",
            zIndex: 999,
          }}
        >
          <div className="w-full h-auto text-center">
            <p className="text-white text-xl font-semibold mb-10">
              Update your Pet's Details
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
            <UpdateButton loading={loading}>Submit</UpdateButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdatePetRecordContent;
