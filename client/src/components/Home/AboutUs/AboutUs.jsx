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
        initial={{ opacity: 0, translateX: "-20%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10 md:mb-0 md:mr-10"
      >
        <img
          src={AboutUsImage}
          className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[500px] xl:h-[500px] object-cover"
          alt="About Us"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateX: "100%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-3/4 lg:w-1/2 px-4 md:px-0"
      >
        <h1 className="text-center mb-6 md:mb-10 font-bold text-3xl md:text-5xl tracking-wide">
          About Us
        </h1>
        <p className="mb-4 font-semibold text-sm md:text-md leading-relaxed">
          Furry Pet Clinic, founded by Dr. Dhammika Kumarasinghe in 2020, is a
          trusted name in providing quality veterinary care for your beloved
          pets. With a team of experienced and compassionate veterinarians, we
          strive to ensure the health and well-being of your furry companions.
        </p>
        <p className="mb-4 font-semibold text-sm md:text-md leading-relaxed">
          Our mission is to provide comprehensive and personalized care for pets
          of all shapes and sizes. Whether it's routine check-ups, vaccinations,
          or specialized treatments, we are dedicated to meeting the unique
          needs of each pet.
        </p>
        <p className="font-sans font-semibold text-sm md:text-md leading-relaxed">
          At Furry Pet Clinic, we understand the special bond between pets and
          their owners, and we are committed to fostering that bond by
          delivering exceptional veterinary services with a personal touch.
        </p>
      </motion.div>
    </div>
  );
};

export default Aboutus;
