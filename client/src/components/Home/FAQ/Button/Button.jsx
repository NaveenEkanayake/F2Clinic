import React from "react";

const Button = ({ title, icon, onClick }) => {
  return (
    <button onClick={onClick} className="flex justify-between w-full">
      <span className="text-white text-xl ">{title}</span>
      <span className="text-white text-3xl">{icon}</span>
    </button>
  );
};

export default Button;
