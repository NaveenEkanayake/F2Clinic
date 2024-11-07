import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import PaymentSVG from "./PaymentSVG/PaymentSVG";

const PaymentContents = () => {
  // // Handle form submission
  // const handleConfirmPayment = (event) => {
  //   event.preventDefault(); // Prevent default form submission

  //   // Perform any additional payment confirmation logic here
  //   onConfirm(); // Call the passed onConfirm function
  // };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-5xl">
        <PaymentSVG />
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          className="w-[60%] h-auto py-20 rounded-xl ml-11"
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
            className="w-full h-auto flex flex-col items-center gap-7 px-10"
            // onSubmit={handleConfirmPayment}
          >
            <p className="text-white text-xl font-semibold">Payment Details</p>
            <div className="w-full relative">
              <label className="text-white font-semibold">
                Cardholder Name
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter cardholder name"
                required
              />
            </div>

            <div className="w-full relative">
              <label className="text-white font-semibold">Card Number</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter card number"
                required
              />
            </div>

            <div className="w-full flex gap-4">
              <div className="relative w-1/2">
                <label className="text-white font-semibold">Expiry Date</label>
                <input
                  type="month"
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  required
                />
              </div>
              <div className="relative w-1/2">
                <label className="text-white font-semibold">CVV</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                  placeholder="CVV"
                  required
                />
              </div>
            </div>

            <div className="w-full flex justify-between">
              <button
                type="submit"
                className=" w-full text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white py-2 px-8 rounded-lg outline-none"
              >
                Confirm Payment
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentContents;
