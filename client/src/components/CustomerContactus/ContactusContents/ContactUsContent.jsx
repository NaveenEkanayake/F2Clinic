import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactusSVG from "../ContactusSVG/ContactusSVG";

const ContactUsContent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-5xl">
        <ContactusSVG />
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
            <p className="text-white text-xl font-semibold mb-10">Contact Us</p>
          </div>
          <form
            className="w-full h-auto flex flex-col items-center gap-7 px-10"
            onSubmit={handleSubmit}
          >
            <div className="w-full relative">
              <label className="text-white font-semibold">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Message</label>
              <textarea
                name="message"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your message"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-5 py-2 px-6 border-2 text-center border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUsContent;
