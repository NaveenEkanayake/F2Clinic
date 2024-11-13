import React, { useState } from "react";
import { motion } from "framer-motion";
import DRRobertJhonson from "../../../assets/images/DR.sarath.jpg";
import DrSamantha from "../../../assets/images/Dr.Samantha.avif";
import DRbarbara from "../../../assets/images/DR.Barbara.jpg";

const OurSpecialist = () => {
  const [isFlipped1, setIsFlipped1] = useState(false);
  const [isFlipped2, setIsFlipped2] = useState(false);
  const [isFlipped3, setIsFlipped3] = useState(false);

  return (
    <div className="h-[500px]" id="specialists">
      <motion.h2
        initial={{ translateY: "20%" }}
        whileInView={{ translateY: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-[0px] font-bold text-[30px] sm:text-[50px] tracking-wide mb-10"
      >
        Our Specialists
      </motion.h2>
      <div className="flex justify-center space-x-4  ">
        <motion.div
          initial={{ translateY: "20%" }}
          whileInView={{ translateY: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full sm:w-[350px] h-[390px] sm:h-[390px] cursor-pointer group rounded-3xl overflow-hidden"
          onMouseEnter={() => setIsFlipped1(true)}
          onMouseLeave={() => setIsFlipped1(false)}
        >
          <motion.div
            className="absolute inset-0 rounded-3xl flex items-center justify-center backface-hidden"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped1 ? 180 : 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl"
              style={{
                backgroundImage: `url(${DRRobertJhonson})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                backgroundBlendMode: "overlay",
              }}
            >
              <h2 className="text-white font-medium text-lg  sm:text-2xl text-[20px] text-nowrap sm:tracking-wide px-4">
                DR. Robert Jhonson
              </h2>
            </div>
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-3xl flex items-center justify-center bg-[#0F1823] z-40 backface-hidden"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped1 ? 0 : 180 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-white text-center p-4">
              <p className="text-sm sm:text-base">
                Specializing in veterinary surgery, DR. Robert Jhonson has
                extensive experience in performing both routine and complex
                procedures for pets.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Second Card */}
        <motion.div
          initial={{ translateY: "20%" }}
          whileInView={{ translateY: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full sm:w-[350px] h-[390px] sm:h-[390px] cursor-pointer group rounded-3xl overflow-hidden"
          onMouseEnter={() => setIsFlipped2(true)}
          onMouseLeave={() => setIsFlipped2(false)}
        >
          <motion.div
            className="absolute inset-0 rounded-3xl flex items-center justify-center backface-hidden"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped2 ? 180 : 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl"
              style={{
                backgroundImage: `url(${DrSamantha})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                backgroundBlendMode: "overlay",
              }}
            >
              <h2 className="text-white font-medium text-xl sm:text-2xl text-[20px] tracking-wide px-4">
                Dr. Samantha
              </h2>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-3xl flex items-center justify-center bg-[#0F1823] z-40 backface-hidden"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped2 ? 0 : 180 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-white text-center p-4">
              <p className="text-sm sm:text-base">
                Specializes in internal medicine for pets, focusing on
                diagnosing and managing chronic illnesses.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Third Card */}
        <motion.div
          initial={{ translateY: "20%" }}
          whileInView={{ translateY: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full sm:w-[350px] h-[390px] sm:h-[390px] cursor-pointer group rounded-3xl overflow-hidden"
          onMouseEnter={() => setIsFlipped3(true)}
          onMouseLeave={() => setIsFlipped3(false)}
        >
          {/* Front Side */}
          <motion.div
            className="absolute inset-0 rounded-3xl flex items-center justify-center backface-hidden"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped3 ? 180 : 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl"
              style={{
                backgroundImage: `url(${DRbarbara})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                backgroundBlendMode: "overlay",
              }}
            >
              <h2 className="text-white font-medium text-xl sm:text-2xl text-[20px] tracking-wide px-4">
                Dr. Barbara
              </h2>
            </div>
          </motion.div>

          {/* Back Side */}
          <motion.div
            className="absolute inset-0 rounded-3xl flex items-center justify-center bg-[#0F1823] z-40 backface-hidden"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped3 ? 0 : 180 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-white text-center p-4">
              <p className="text-sm sm:text-base">
                Specializes in orthopedic surgery for pets, focusing on
                diagnosing and treating musculoskeletal conditions. He is adept
                at performing surgeries to repair fractures and other injuries,
                ensuring pets can return to their active lifestyles.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurSpecialist;
