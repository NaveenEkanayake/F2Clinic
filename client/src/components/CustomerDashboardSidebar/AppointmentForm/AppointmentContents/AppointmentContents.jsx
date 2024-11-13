import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppointmentSvg from "../AppointmentSVG/AppointmentSvg";
import { addAppointment } from "../../../../Api/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";

const AppointmentContents = ({ isSidebarOpen }) => {
  const [Doctorname, setDoctorname] = useState("");
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [SpecialConcern, setSpecialConcern] = useState("");
  const [AppointmentPrice, setAppointmentPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    addAppointment({ Doctorname, Time, Date, SpecialConcern, AppointmentPrice })
      .then((result) => {
        console.log(" Appointment Creation successfully", result);
        toast.success(" Appointment Added successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/AppointmentPayment");
        }, 3000);
      })
      .catch((err) => {
        console.error("Appointment Creation failed:", err);
        toast.error(
          "Appointment Creation failed. Appointment already exist with this User.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-5xl flex-col lg:flex-row">
        <AppointmentSvg />
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[60%] h-auto py-10 lg:py-20 rounded-xl lg:ml-10 mt-8 lg:mt-0"
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
                value={Doctorname}
                onChange={(e) => setDoctorname(e.target.value)}
                placeholder="Type doctor name"
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Time Slot</label>
              <select
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none flex items-center"
                value={Time}
                id="Time"
                name="Time"
                onChange={(e) => setTime(e.target.value)}
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
                  type="Date"
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  value={Date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">
                Appointment Price:
              </label>
              <div className="flex items-center mt-2">
                <select
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  value={AppointmentPrice}
                  name="AppointmentPrice"
                  id="AppointmentPrice"
                  onChange={(e) => setAppointmentPrice(e.target.value)}
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
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  placeholder="Enter any special concerns..."
                  value={SpecialConcern}
                  onChange={(e) => setSpecialConcern(e.target.value)}
                />
              </div>
            </div>
            <SubmitButton loading={loading}>Submit</SubmitButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentContents;
