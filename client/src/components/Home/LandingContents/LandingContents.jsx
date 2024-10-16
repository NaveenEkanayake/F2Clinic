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
        className="absolute top-[100px] right-0 p-9 text-white text-3xl flex items-start space-x-4"
      >
        <span className="flex flex-col items-center">
          <h1 className="mb-2">Experienced Doctors</h1>
          <AnimatedCounter from={0} to={20} key="doctors-counter" />
        </span>
        <span className="mx-2">|</span>
        <span className="flex flex-col items-center">
          <h1 className="mb-2">Performed Surgeries</h1>
          <AnimatedCounter from={0} to={30} key="surgeries-counter" />
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, translateY: "100%" }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4 }}
        className="text-white text-5xl font-bold mb-4"
      >
        Today's Goal: Care for Stray Dogs!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, translateY: "100%" }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4 }}
        className="text-white text-lg mb-8"
      >
        Your donations help us provide food, shelter, and medical care for stray
        dogs in need.
      </motion.p>
      <JoinUsButton>Join Us</JoinUsButton>
    </div>
  );
};

export default LandingContents;
