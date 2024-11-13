import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import PaymentSVG from "./PaymentSVG/PaymentSVG";
import { AppointmentPrice } from "../../../../Api/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const PaymentContents = () => {
  const [formData, setFormData] = useState({
    cardholdername: "",
    cardnumber: "",
    ExpireDate: "",
    Cvv: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentIcon, setCurrentIcon] = useState(0);

  // Icons array for animated loading icon
  const icons = [
    <HourglassEmptyIcon className="text-white mr-2" />,
    <HourglassFullIcon className="text-white mr-2" />,
    <HourglassTopIcon className="text-white mr-2" />,
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentIcon((prev) => (prev + 1) % icons.length);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading, icons.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 10000);

    try {
      const { cardholdername, cardnumber, ExpireDate, Cvv } = formData;

      await AppointmentPrice({
        cardholdername,
        cardnumber,
        ExpireDate,
        Cvv,
      });

      toast.success("Consultant added successfully!");
      setTimeout(() => {
        setLoading(true);
        navigate("/customerdashboard");
      }, 3000);
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
      console.log(error.message);
    } finally {
      clearTimeout(loadingTimeout);
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <ToastContainer />
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2">
        <PaymentSVG className="hidden lg:block" />

        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-auto py-10 lg:py-20 rounded-xl"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            boxShadow: "8px 8px 40px rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "2px solid rgba(255, 255, 255, 0.61)",
            zIndex: 999,
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full h-auto grid gap-5 lg:gap-7 px-6 lg:px-10"
          >
            <p className="text-white text-lg lg:text-xl font-semibold text-center">
              Payment Details
            </p>

            <div className="w-full">
              <label className="text-white font-semibold">
                Cardholder Name
              </label>
              <input
                type="text"
                name="cardholdername"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter cardholder name"
                value={formData.cardholdername}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <label className="text-white font-semibold">Card Number</label>
              <input
                type="text"
                name="cardnumber"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter card number"
                value={formData.cardnumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="text-white font-semibold">Expiry Date</label>
                <input
                  type="month"
                  name="ExpireDate"
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  value={formData.ExpireDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <label className="text-white font-semibold">CVV</label>
                <input
                  type="text"
                  name="Cvv"
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  placeholder="CVV"
                  value={formData.Cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="w-full">
              <button
                type="submit"
                className={`w-full text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white py-2 px-8 rounded-lg outline-none flex items-center justify-center ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    {icons[currentIcon]}
                    <span className="text-white">Processing...</span>
                  </div>
                ) : (
                  "Confirm Payment"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentContents;
