import React from "react";
import { motion } from "framer-motion";
import PetRecordsvg from "./AddPetcareSVG/PetCareSVG";
import SubmitButton from "./SubmitButton/SubmitButton";

const AddPetCareContent = () => {
  return (
    <div className="w-full min-h-screen flex ml-10 items-center justify-center">
      <div className="flex w-full max-w-5xl">
        <PetRecordsvg />
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
              Fill in Pet Care Supplies Details
            </p>
          </div>
          <form className="w-full h-auto flex flex-col items-center gap-7 px-10">
            <div className="w-full relative">
              <label className="text-white font-semibold">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter the supply name"
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Supply Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
              />
            </div>
            <div className="w-full relative">
              <label className="text-white font-semibold">Description</label>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter a description of the supply"
                rows="4"
              />
            </div>
            <SubmitButton>Submit</SubmitButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPetCareContent;
