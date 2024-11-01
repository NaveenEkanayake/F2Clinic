import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppointmentSvg from "../AppointmentSVG/AppointmentSvg";
import PersonalForm from "../PeronalForm/PersonalForm";
import AppointmentNextButton from "../NextButton/NextButton";
import PaymentForm from "../Payment/Payment";
import {
  verifyCustomer,
  getAllConsultantNames,
  addAppointment,
} from "../../../../Api/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppointmentContents = ({ isSidebarOpen }) => {
  const [currentForm, setCurrentForm] = useState("appointment");
  const [consultantNames, setConsultantNames] = useState([]);

  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [specialConcern, setSpecialConcern] = useState("");
  const [appointmentPrice, setAppointmentPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const appointmentData = {
      doctorName,
      appointmentDate,
      timeSlot,
      specialConcern,
    };

    addAppointment(appointmentData)
      .then((result) => {
        console.log("Appointment added successfully", result);
        toast.success("Appointment added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/admindashboard");
        }, 3000);
      })
      .catch((err) => {
        console.error("Appointment failed:", err);
        toast.error("Appointment failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchAllConsultantNames = async () => {
      try {
        const UserId = verifyCustomer();
        if (!UserId) {
          console.log("User ID not found.");
        }

        const response = await getAllConsultantNames();
        console.log(response);
        if (Array.isArray(response.consultants)) {
          setConsultantNames(response.consultants);
        } else {
          console.error(
            "Consultants data is not an array:",
            response.consultants
          );
          setConsultantNames([]);
        }
      } catch (err) {
        console.error("Error fetching Consultant Names:", err);
        setConsultantNames([]);
      }
    };

    fetchAllConsultantNames();
  }, []);

  const handleBack = () => {
    setCurrentForm("appointment");
  };

  const handleConfirmPayment = () => {
    alert("Payment Confirmed!");
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
            <form
              className="w-full h-auto flex flex-col items-center gap-7 px-10"
              onSubmit={handleSubmit}
            >
              <div className="w-full relative">
                <label className="text-white font-semibold">Doctor Name</label>
                <select
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none flex items-center"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                >
                  <option value="" disabled>
                    Select a doctor
                  </option>
                  {consultantNames.length > 0 ? (
                    consultantNames.map((name, index) => (
                      <option key={index} className="bg-slate-900" value={name}>
                        {name}
                      </option>
                    ))
                  ) : (
                    <option className="bg-slate-900" disabled>
                      No consultants available
                    </option>
                  )}
                </select>
              </div>
              <div className="w-full relative">
                <label className="text-white font-semibold">Time Slot</label>
                <select
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none flex items-center"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
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
                    className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
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
                    value={appointmentPrice}
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
                    value={specialConcern}
                    onChange={(e) => setSpecialConcern(e.target.value)}
                  />
                </div>
              </div>
              <AppointmentNextButton
                currentForm={currentForm}
                setCurrentForm={() => setCurrentForm("personal")}
              >
                Next
              </AppointmentNextButton>
            </form>
          ) : currentForm === "personal" ? (
            <PersonalForm
              onBack={handleBack}
              onNext={() => setCurrentForm("payment")}
            />
          ) : (
            <PaymentForm onBack={handleBack} onConfirm={handleConfirmPayment} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentContents;
