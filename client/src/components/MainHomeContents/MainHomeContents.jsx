import React from "react";
import MainHomeCover from "../../assets/images/BackgroundMainHome.jpg";
import { motion } from "framer-motion";

const MainHomeContents = () => {
  return (
    <div
      className="flex justify-center items-center  text-2xl font-semibold h-full  bg-cover"
      style={{
        backgroundImage: `url(${MainHomeCover})`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, translateY: 100 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1 }}
        className="  mb-24 font-semibold text-[24px] xl:text-[58px] text-white text-nowrap"
      >
        Welcome to Furry Pet Clinic !!!
      </motion.h1>
    </div>
  );
};

export default MainHomeContents;
