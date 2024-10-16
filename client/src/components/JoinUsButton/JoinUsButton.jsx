import React from "react";
import { motion } from "framer-motion";

const JoinUsButton = (props) => {
  return (
    <motion.button
      initial={{ opacity: 0, translateY: "100%" }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      className=" border border-blue-500 text-blue-500 text-lg font-bold py-2 px-6 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
    >
      {props.children}
    </motion.button>
  );
};

export default JoinUsButton;
