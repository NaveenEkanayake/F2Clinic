import React, { useState } from "react";
import { motion } from "framer-motion";
import ConsultantSvg from "./Consultantsvg/ConsultantSvg";
import SubmitButton from "./ConsultantSubmitButton/SubmitButton";
import { addConsultant, verifyadmin } from "@/Api/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ConsultantContents = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    speciality: "",
    email: "",
    telephoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Telephone validation
    const telephoneRegex = /^[0-9]{10}$/; // Ensures exactly 10 digits
    if (!telephoneRegex.test(formData.telephoneNumber)) {
      toast.error("Please enter a valid 10-digit telephone number.");
      return;
    }

    setLoading(true);

    try {
      const { adminId } = await verifyadmin();

      const { firstname, lastname, speciality, email, telephoneNumber } =
        formData;

      await addConsultant({
        firstname,
        lastname,
        speciality,
        email,
        telephoneNumber,
        adminId,
      });

      toast.success("Consultant added successfully!");
      setTimeout(() => {
        navigate("/admindashboard");
      }, 3000);
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl gap-5">
        <ConsultantSvg />
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
              Consultant Registration Form
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full h-auto flex flex-col items-center gap-7 px-10"
          >
            <div className="w-full relative">
              <label className="text-white font-semibold">First Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                required
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
              />
            </div>

            <div className="w-full relative">
              <label className="text-white font-semibold">Last Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                required
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
              />
            </div>

            <div className="w-full relative">
              <label className="text-white font-semibold">Speciality</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                required
                value={formData.speciality}
                onChange={(e) =>
                  setFormData({ ...formData, speciality: e.target.value })
                }
              />
            </div>

            <div className="w-full relative">
              <label className="text-white font-semibold">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="w-full relative">
              <label className="text-white font-semibold">
                Telephone Number
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                maxLength="10"
                required
                value={formData.telephoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, telephoneNumber: e.target.value })
                }
              />
            </div>
            <SubmitButton loading={loading}>Submit</SubmitButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultantContents;
