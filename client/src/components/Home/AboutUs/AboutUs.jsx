import React from "react";
import { motion } from "framer-motion";
import AboutUsImage from "../../../assets/images/AboutUsimg.png";

const Aboutus = () => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center mt-20 mx-auto max-h-screen-xl px-4"
      id="aboutus"
    >
      <motion.div
        initial={{ opacity: 0, translateX: "-100%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10 md:mb-0 md:mr-10"
      >
        <img
          src={AboutUsImage}
          className="w-[500px]  h-[500px]"
          alt="About Us"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateX: "100%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2"
      >
        <h1 className="text-center mb-10 font-bold text-5xl tracking-wider">
          About Us
        </h1>
        <p className="mb-4 font-semibold text-md">
          Furry Pet Clinic, founded by Dr. Dhammika Kumarasinghe in 2020, is a
          trusted name in providing quality veterinary care for your beloved
          pets. With a team of experienced and compassionate veterinarians, we
          strive to ensure the health and well-being of your furry companions.
        </p>
        <p className="mb-4 font-semibold text-md">
          Our mission is to provide comprehensive and personalized care for pets
          of all shapes and sizes. Whether it's routine check-ups, vaccinations,
          or specialized treatments, we are dedicated to meeting the unique
          needs of each pet.
        </p>
        <p className="font-sans font-semibold text-md">
          At Furry Pet Clinic, we understand the special bond between pets and
          their owners, and we are committed to fostering that bond by
          delivering exceptional veterinary services with a personal touch.
        </p>
      </motion.div>
    </div>
  );
};

export default Aboutus;
