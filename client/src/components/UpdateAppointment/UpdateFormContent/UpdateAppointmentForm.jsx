import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateSVG from "../UpdateSVG/UpdateSVG";
import UpdateButton from "../UpdateButton/UpdateButton";
import { getAppointmentById, UpdateAppointment } from "../../../Api/config";
import { motion } from "framer-motion";

const UpdateAppointmentForm = () => {
  const [formData, setFormData] = useState({
    Doctorname: "",
    Time: "",
    Date: "",
    AppointmentPrice: "",
    SpecialConcern: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointmentById(id);
        if (data && data.retrievedData) {
          setFormData(data.retrievedData);
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        toast.error("Failed to load appointment data.", { autoClose: 3000 });
      }
    };
    fetchAppointments();
  }, [id]);

  const handleChange = (e) => {
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
      await UpdateAppointment(id, formData);
      toast.success("Appointment updated successfully!", { autoClose: 3000 });
      setTimeout(() => {
        setLoading(false);
        navigate("/viewappointment");
      }, 3000);
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment.", { autoClose: 3000 });

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-5xl">
        <UpdateSVG />
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          className="w-[60%] h-auto py-20 rounded-xl"
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
              Struggling to Contact Us? Make Your Appointment here!!!
            </p>
          </div>
          <form
            className="w-full h-auto flex flex-col items-center gap-7 px-10"
            onSubmit={handleSubmit}
          >
            <div className="w-full relative">
              <label className="text-white font-semibold">Doctor Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                value={formData.Doctorname}
                name="Doctorname"
                onChange={handleChange}
                placeholder="Type doctor name"
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Time Slot</label>
              <select
                name="Time"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none flex items-center"
                value={formData.Time}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a time slot
                </option>
                <option className="bg-slate-900" value="9am">
                  9.00 AM
                </option>
                <option className="bg-slate-900" value="10am">
                  10.00 AM
                </option>
                <option className="bg-slate-900" value="11am">
                  11.00 AM
                </option>
              </select>
            </div>

            <div className="w-full relative">
              <label className="text-white font-semibold">Date</label>
              <div className="flex items-center mt-2">
                <input
                  type="date"
                  name="Date"
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  value={formData.Date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">
                Appointment Price:
              </label>
              <div className="flex items-center mt-2">
                <select
                  name="AppointmentPrice"
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  value={formData.AppointmentPrice}
                  onChange={handleChange}
                >
                  <option value="" className="bg-slate-900" disabled>
                    Select appointment price
                  </option>
                  <option value="2500" className="bg-slate-900">
                    Normal - Rs. 2500
                  </option>
                  <option value="3500" className="bg-slate-900">
                    Immediate - Rs. 3500
                  </option>
                </select>
              </div>
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">
                Special Concern
              </label>
              <div className="flex items-center mt-2">
                <textarea
                  name="SpecialConcern"
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  placeholder="Enter any special concerns..."
                  value={formData.SpecialConcern}
                  onChange={handleChange}
                />
              </div>
            </div>
            <UpdateButton loading={loading}>Update</UpdateButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateAppointmentForm;
