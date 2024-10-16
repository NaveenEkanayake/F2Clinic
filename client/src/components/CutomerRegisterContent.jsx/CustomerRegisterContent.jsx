import React from "react";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { motion } from "framer-motion";
import LoginImage from "../../assets/images/Customerlogin.jpg";
import RegisterButton from "../RegisterButton/RegisterButton";

const CustomerRegisterContent = () => {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage: `url(${LoginImage})`,
        backgroundRepeat: "no-repeat",
        filter: "brightness(0.9)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, translateY: "100%" }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[40%] h-auto py-20 rounded-xl"
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
          <p className="text-white text-2xl font-semibold mb-9">
            New to to Our Furry Pet Clinic!!!
          </p>
        </div>
        <form className="w-full h-auto flex flex-col items-center gap-7 px-10">
          <div className="w-full relative">
            <label className="text-white font-semibold">Full Name</label>
            <div className="flex items-center mt-2">
              <IoPersonOutline className="text-white mr-3" />
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
          </div>
          <div className="w-full relative">
            <label className="text-white font-semibold">Email</label>
            <div className="flex items-center mt-2">
              <IoMailOutline className="text-white mr-3" />
              <input
                type="email"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="w-full relative">
            <label className="text-white font-semibold">Password</label>
            <div className="flex items-center mt-2">
              <IoLockClosedOutline className="text-white mr-3" />
              <input
                type="password"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <RegisterButton>Register</RegisterButton>
        </form>
      </motion.div>
    </div>
  );
};

export default CustomerRegisterContent;
