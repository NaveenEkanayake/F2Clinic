import React from "react";
import { IoChevronForward } from "react-icons/io5";

const NextButton = ({ setCurrent, current, total }) => {
  const nextTestimonial = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <button
      onClick={nextTestimonial}
      className=" text-gray-800 rounded-full  flex items-center"
    >
      <IoChevronForward className="text-2xl" />
    </button>
  );
};

export default NextButton;
