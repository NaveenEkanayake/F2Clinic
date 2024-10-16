import React from "react";
import { motion } from "framer-motion";
import Checkup from "../../../assets/images/checkups.jpg";
import Grooming from "../../../assets/images/Grooming.jpg";
import Surgery from "../../../assets/images/Surgery.png";

const OurServices = () => {
  return (
    <div className="h-[500px]" id="ourservice">
      <motion.h2
        initial={{ translateY: "100%" }}
        whileInView={{ translateY: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-[50px] font-bold text-[50px] tracking-wide"
      >
        Our Services
      </motion.h2>
      <motion.div
        initial={{ translateY: "100%" }}
        whileInView={{ translateY: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mt-[30px] gap-4"
      >
        <div className="flex items-center justify-center ">
          <div
            className="relative h-[300px] w-[400px] rounded-[20px] overflow-hidden cursor-pointer"
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              const overlay = e.currentTarget.querySelector(".overlay");
              const text = e.currentTarget.querySelector(".service-text");
              const paragraphContainer = e.currentTarget.querySelector(
                ".paragraph-container"
              );

              img.style.transition = "transform 0.5s ease";
              img.style.transform = "scale(1.1)";
              overlay.style.opacity = "0.5";
              text.style.zIndex = "10";
              paragraphContainer.style.transform = "translateY(0)";
              paragraphContainer.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              const overlay = e.currentTarget.querySelector(".overlay");
              const text = e.currentTarget.querySelector(".service-text");
              const paragraphContainer = e.currentTarget.querySelector(
                ".paragraph-container"
              );

              img.style.transition = "transform 0.5s ease";
              img.style.transform = "scale(1)";
              overlay.style.opacity = "0";
              text.style.zIndex = "1";
              paragraphContainer.style.transform = "translateY(100%)";
              paragraphContainer.style.opacity = "0";
            }}
          >
            <img
              src={Checkup}
              alt="Checkup"
              className="w-full h-full object-cover bg-cover bg-center"
            />
            <span className="absolute inset-0 text-center top-32 text-white left-[20px] service-text text-3xl font-medium tracking-wide z-10">
              Vaccination
            </span>
            <div
              className="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-80 p-2 rounded-b-[15px] transition-transform duration-500 paragraph-container"
              style={{
                transform: "translateY(100%)",
                zIndex: "5",
                opacity: "0",
                transition: "transform 0.5s ease, opacity 0.5s ease",
              }}
            >
              <p className="font-normal text-center text-white">
                Furry Care Pet Clinic provides baths, haircuts, nail trimming,
                and more to maintain your pet's hygiene and appearance.
              </p>
            </div>
            <div className="absolute inset-0 bg-black opacity-0 overlay transition-opacity duration-500 z-0"></div>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <div
            className="relative h-[300px] w-[400px] rounded-[20px] overflow-hidden cursor-pointer"
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              const overlay = e.currentTarget.querySelector(".overlay");
              const text = e.currentTarget.querySelector(".service-text");
              const paragraphContainer = e.currentTarget.querySelector(
                ".paragraph-container"
              );

              img.style.transition = "transform 0.5s ease";
              img.style.transform = "scale(1.1)";
              overlay.style.opacity = "0.5";
              text.style.zIndex = "10";
              paragraphContainer.style.transform = "translateY(0)";
              paragraphContainer.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              const overlay = e.currentTarget.querySelector(".overlay");
              const text = e.currentTarget.querySelector(".service-text");
              const paragraphContainer = e.currentTarget.querySelector(
                ".paragraph-container"
              );

              img.style.transition = "transform 0.5s ease";
              img.style.transform = "scale(1)";
              overlay.style.opacity = "0";
              text.style.zIndex = "1";
              paragraphContainer.style.transform = "translateY(100%)";
              paragraphContainer.style.opacity = "0";
            }}
          >
            <img
              src={Grooming}
              alt="Grooming"
              className="w-full h-full object-cover bg-cover bg-center"
            />
            <span className="absolute inset-0 text-center top-32 left-[20px] text-white service-text text-3xl font-medium tracking-wide z-10">
              Grooming
            </span>
            <div
              className="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-80 p-2 rounded-b-[15px] transition-transform duration-500 paragraph-container"
              style={{
                transform: "translateY(100%)",
                zIndex: "5",
                opacity: "0",
                transition: "transform 0.5s ease, opacity 0.5s ease",
              }}
            >
              <p className="font-normal text-center text-white">
                Furry Care Pet Clinic provides baths, haircuts, nail trimming,
                and more to maintain your pet's hygiene and appearance.
              </p>
            </div>
            <div className="absolute inset-0 bg-black opacity-0 overlay transition-opacity duration-500 z-0"></div>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <div
            className="relative h-[300px] w-[400px] rounded-[20px] overflow-hidden cursor-pointer"
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              const overlay = e.currentTarget.querySelector(".overlay");
              const text = e.currentTarget.querySelector(".service-text");
              const paragraphContainer = e.currentTarget.querySelector(
                ".paragraph-container"
              );

              img.style.transition = "transform 0.5s ease";
              img.style.transform = "scale(1.1)";
              overlay.style.opacity = "0.5";
              text.style.zIndex = "10";
              paragraphContainer.style.transform = "translateY(0)";
              paragraphContainer.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              const overlay = e.currentTarget.querySelector(".overlay");
              const text = e.currentTarget.querySelector(".service-text");
              const paragraphContainer = e.currentTarget.querySelector(
                ".paragraph-container"
              );

              img.style.transition = "transform 0.5s ease";
              img.style.transform = "scale(1)";
              overlay.style.opacity = "0";
              text.style.zIndex = "1";
              paragraphContainer.style.transform = "translateY(100%)";
              paragraphContainer.style.opacity = "0";
            }}
          >
            <img
              src={Surgery}
              alt="Surgery"
              className="w-full h-full object-cover bg-cover bg-center"
            />
            <span className="absolute inset-0 text-center top-32 left-[20px] text-white service-text text-3xl font-medium tracking-wide z-10">
              Surgery
            </span>
            <div
              className="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-80 p-2 rounded-b-[15px] transition-transform duration-500 paragraph-container"
              style={{
                transform: "translateY(100%)",
                zIndex: "5",
                opacity: "0",
                transition: "transform 0.5s ease, opacity 0.5s ease",
              }}
            >
              <p className="font-normal text-center text-white">
                Our skilled veterinarians perform surgeries with the utmost care
                and precision to ensure your pet's health and safety.
              </p>
            </div>
            <div className="absolute inset-0 bg-black opacity-0 overlay transition-opacity duration-500 z-0"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OurServices;
