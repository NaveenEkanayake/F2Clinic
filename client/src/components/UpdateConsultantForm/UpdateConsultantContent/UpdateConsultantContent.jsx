import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UpdateConsultantSVG from "../UpdateSVG/UpdateConsultantSVG";
import { getConsultantById, updateConsultant } from "@/Api/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import UpdateButton from "../UpdateSubmitButton/UpdateButton";

const UpdateConsultantContents = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    speciality: "",
    email: "",
    telephoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchConsultant = async () => {
      try {
        const data = await getConsultantById(id);
        if (data && data.retrievedData) {
          setFormData(data.retrievedData);
        }
      } catch (error) {
        console.error("Error fetching consultant data:", error);
        toast.error("Failed to load consultant data.", { autoClose: 3000 });
      }
    };
    fetchConsultant();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateConsultant(id, formData);
      toast.success("Consultant updated successfully!", { autoClose: 3000 });
      setTimeout(() => {
        setLoading(false);
        navigate("/viewconsultant");
      }, 3000);
    } catch (error) {
      console.error("Error updating consultant:", error);
      toast.error("Failed to update consultant.", { autoClose: 3000 });

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <ToastContainer position="top-right" />
      <div className="flex w-full max-w-5xl">
        <UpdateConsultantSVG />
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
              Update Consultant Form
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
            <UpdateButton loading={loading}>Submit</UpdateButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateConsultantContents;
