import React from "react";
import { IoChevronBack } from "react-icons/io5";

const PrevButton = ({ setCurrent, current, total }) => {
  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  return (
    <button
      onClick={prevTestimonial}
      className=" text-gray-800  rounded-full flex items-center"
    >
      <IoChevronBack className="text-2xl" />
    </button>
  );
};

export default PrevButton;
