import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import UpdatePetCareButton from "../UpdateButton/UpdatePetCareButton";
import UpdatePetCareSVG from "../UpdatePetCareSVG/UpdatePetCareSVG";
import { updatePetcareSupply, getPetcareSupplyById } from "../../../Api/config";

const UpdatePetCareContents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Supplyname: "",
    price: "",
    SupplyDescription: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPetcareSupply = async () => {
      try {
        const data = await getPetcareSupplyById(id);
        if (data && data.retrievedData) {
          setFormData(data.retrievedData);
        }
      } catch (error) {
        console.error("Error fetching PetcareSupply data:", error);
        toast.error("Failed to load PetcareSupply data.", { autoClose: 3000 });
      }
    };
    fetchPetcareSupply();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updatePetcareSupply(id, formData);
      toast.success("PetcareSupply updated successfully!", { autoClose: 3000 });
      setTimeout(() => {
        setLoading(false);
        navigate("/viewpetcare");
      }, 3000);
    } catch (error) {
      console.error("Error updating PetcareSupply:", error);
      toast.error("Failed to update PetcareSupply.", { autoClose: 3000 });
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex ml-10 items-center justify-center">
      <ToastContainer />
      <div className="flex w-full max-w-5xl">
        <UpdatePetCareSVG />
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
              Update Pet Care Supplies Details
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
              <label className="text-white font-semibold">Price</label>
              <div className="flex items-center border border-gray-200 rounded-lg bg-transparent">
                <span className="text-white p-3">LKR</span>
                <input
                  type="text"
                  name="price"
                  className="w-full p-3 rounded-lg border-none bg-transparent text-white focus:outline-none"
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
            <UpdatePetCareButton loading={loading}>Submit</UpdatePetCareButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdatePetCareContents;
