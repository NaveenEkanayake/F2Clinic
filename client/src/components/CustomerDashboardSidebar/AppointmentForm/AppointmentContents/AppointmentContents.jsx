import React, { useState } from "react";
import { motion } from "framer-motion";
import AppointmentSvg from "../AppointmentSVG/AppointmentSvg";
import PersonalForm from "../PeronalForm/PersonalForm";
import AppointmentNextButton from "../NextButton/NextButton";

const AppointmentContents = ({ isSidebarOpen }) => {
  const [currentForm, setCurrentForm] = useState("appointment");

  const handleBack = () => {
    setCurrentForm("appointment");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-5xl">
        <AppointmentSvg />
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
          {currentForm === "appointment" ? (
            <form className="w-full h-auto flex flex-col items-center gap-7 px-10">
              <div className="w-full relative">
                <label className="text-white font-semibold">Doctor Name</label>
                <select className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none flex items-center">
                  <option value="" disabled selected>
                    Select a doctor
                  </option>
                  <option className="bg-slate-900" value="doctor1">
                    Doctor 1
                  </option>
                  <option className="bg-slate-900" value="doctor2">
                    Doctor 2
                  </option>
                  <option className="bg-slate-900" value="doctor3">
                    Doctor 3
                  </option>
                </select>
              </div>

              <div className="w-full relative">
                <label className="text-white font-semibold">Time Slot</label>
                <select className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none flex items-center">
                  <option value="" disabled selected>
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
                    className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  />
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
                  />
                </div>
              </div>
              <AppointmentNextButton
                currentForm={currentForm}
                setCurrentForm={setCurrentForm}
              >
                Next
              </AppointmentNextButton>
            </form>
          ) : (
            <PersonalForm onBack={handleBack} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentContents;
