import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactusSVG from "../ContactusSVG/ContactusSVG";
import { AddMessage } from "@/Api/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SubmitButton from "./ContactusSubmitButton/SubmitButton";

const ContactUsContent = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    AddMessage({ fullname, email, message })
      .then((result) => {
        console.log("Message Created successfully", result);
        toast.success("Message Created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/customerdashboard");
        }, 3000);
      })
      .catch((err) => {
        console.error("Message creation failed:", err);
        toast.error("Message creation failed.", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl flex-col sm:flex-row">
        <ContactusSVG className="w-full sm:w-[40%] h-auto mb-8 sm:mb-0" />
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full sm:w-[60%] h-auto py-10 sm:py-20 rounded-xl"
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
            <p className="text-white text-xl sm:text-2xl font-semibold mb-6 sm:mb-10">
              Contact Us
            </p>
          </div>
          <form
            className="w-full h-auto flex flex-col items-center gap-6 sm:gap-7 px-4 sm:px-10"
            onSubmit={handleSubmit}
          >
            <div className="w-full relative">
              <label className="text-white font-semibold">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your message"
                rows="5"
                required
              ></textarea>
            </div>
            <SubmitButton loading={loading}>Submit</SubmitButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUsContent;
