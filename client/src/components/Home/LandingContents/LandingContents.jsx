import React from "react";
import BackgroundVideo from "../../../assets/Video/CoverVideo.mp4";
import { motion } from "framer-motion";
import JoinUsButton from "../../JoinUsButton/JoinUsButton";
import AnimatedCounter from "../../AnimatedCounter/AnimatedCounter";

const LandingContents = () => {
  return (
    <div
      className="h-screen relative flex flex-col items-center justify-center text-center"
      id="homesection"
    >
      <video
        src={BackgroundVideo}
        className="absolute inset-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
      />
      <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>
      <motion.div
        initial={{ opacity: 0, translateX: "100%" }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.1 }}
        className="absolute p-4 md:top-[100px] top-[50px] right-0 md:p-9 text-white md:text-3xl text-xl flex items-start space-x-4"
        style={{
          translateX: window.innerWidth < 768 ? "0%" : "100%",
        }}
      >
        <span className="flex flex-col items-center">
          <h1 className="mb-2 text-center">Experienced Doctors</h1>
          <AnimatedCounter from={0} to={20} key="doctors-counter" />
        </span>
        <span className="mx-2">|</span>
        <span className="flex flex-col items-center">
          <h1 className="mb-2 text-center">Performed Surgeries</h1>
          <AnimatedCounter from={0} to={30} key="surgeries-counter" />
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, translateY: "100%" }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4 }}
        className="text-white text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center"
      >
        Today's Goal: Care for Stray Dogs!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, translateY: "100%" }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4 }}
        className="text-white text-base md:text-lg mb-6 md:mb-8 text-center px-4 md:px-0"
      >
        Your donations help us provide food, shelter, and medical care for stray
        dogs in need.
      </motion.p>
      <JoinUsButton>Join Us</JoinUsButton>
    </div>
  );
};

export default LandingContents;
