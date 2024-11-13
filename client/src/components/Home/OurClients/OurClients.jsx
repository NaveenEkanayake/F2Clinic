import React from "react";
import Marquee from "react-fast-marquee";
import Client1 from "../../../assets/images/Client1.jpg";
import Client2 from "../../../assets/images/Client2.jpg";
import Client3 from "../../../assets/images/Client3.jpg";
import Client4 from "../../../assets/images/Client4.jpg";
import Client5 from "../../../assets/images/Client5.jpg";
import Client6 from "../../../assets/images/Client6.jpg";
import Client7 from "../../../assets/images/Client7.jpg";
import Client8 from "../../../assets/images/Client8.jpg";
import { motion } from "framer-motion";
const OurClients = () => {
  return (
    <div id="partners">
      <motion.div
        initial={{ translateY: "20%" }}
        whileInView={{ translateY: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-[80px] font-bold text-[30px] sm:text-[50px] tracking-wide mb-10"
      >
        <h1>Our Partners</h1>
      </motion.div>
      <div className="overflow-hidden w-full max-w-[1200px] mx-auto cursor-pointer">
        <Marquee speed={40} gradient={false}>
          <div className="flex ">
            <div className="w-[100px] h-[100px] transition duration-300 ease-in-out transform  mr-14">
              <img
                src={Client1}
                className="w-full h-full object-contain filter grayscale transition duration-300 hover:filter-none"
              />
            </div>
            <div className="w-[100px] h-[100px] transition duration-300 ease-in-out transform  mr-14">
              <img
                src={Client2}
                className="w-full h-full object-contain filter grayscale transition duration-300 hover:filter-none"
              />
            </div>
            <div className="w-[100px] h-[100px] transition duration-300 ease-in-out transform  mr-14">
              <img
                src={Client3}
                className="w-full h-full object-contain filter grayscale transition duration-300 hover:filter-none"
              />
            </div>
            <div className="w-[100px] h-[100px] transition duration-300 ease-in-out transform  mr-14">
              <img
                src={Client4}
                className="w-full h-full object-contain filter grayscale transition duration-300 hover:filter-none"
              />
            </div>
            <div className="w-[100px] h-[100px] transition duration-300 ease-in-out transform  mr-14">
              <img
                src={Client5}
                className="w-full h-full object-contain filter grayscale transition duration-300 hover:filter-none"
              />
            </div>
            <div className="w-[100px] h-[100px] transition duration-300 ease-in-out transform  mr-14">
              <img
                src={Client6}
                className="w-full h-full object-contain filter grayscale transition duration-300 hover:filter-none"
              />
            </div>
            <div className="w-[100px] h-[100px] transition duration-300 ease-in-out transform  mr-14">
              <img
                src={Client7}
                className="w-full h-full object-contain filter grayscale transition duration-300 hover:filter-none"
              />
            </div>
            <div className="w-[100px] h-[100px] transition duration-300 ease-in-out transform  mr-14">
              <img
                src={Client8}
                className="w-full h-full object-contain filter grayscale transition duration-300 hover:filter-none"
              />
            </div>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default OurClients;
