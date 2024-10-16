import React from "react";
import Accordion from "./Accordion";
import { motion } from "framer-motion";
const FAQ = () => {
  return (
    <>
      <motion.h1
        initial={{ translateY: "100%" }}
        whileInView={{ translateY: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center font-bold text-[50px] tracking-wide mt-[-100px] mb-7"
        id="faq"
      >
        FAQ
      </motion.h1>
      <motion.div
        initial={{ translateY: "100%" }}
        whileInView={{ translateY: 0 }}
        transition={{ duration: 0.8 }}
        className="p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600"
      >
        <Accordion
          title="What are your opening hours?"
          answer="we provide a wide range of services including wellness exams, vaccinations, grooming, surgery, and emergency care for furry pets like dogs, cats, rabbits, and more."
        />
        <hr className="my-4 border-white opacity-50" />
        <Accordion
          title="What are your clinic's opening hours?"
          answer="Our clinic is open Monday to Saturday from 8 AM to 6 PM. We are closed on Sundays, but emergency services are available 24/7."
        />
        <hr className="my-4 border-white opacity-50" />
        <Accordion
          title="What should I bring for my pet's first visit?"
          answer="For your pet's first visit, please bring any previous medical records, a list of current medications, and any special food or treats your pet may need."
        />
        <hr className="my-4 border-white opacity-50" />
        <Accordion
          title="How often should I bring my furry pet for a check-up?"
          answer="For most furry pets, we recommend an annual check-up. However, senior pets or those with specific health concerns may require more frequent visits. "
        />
      </motion.div>
    </>
  );
};

export default FAQ;
