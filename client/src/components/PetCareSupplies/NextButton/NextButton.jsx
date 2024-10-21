import React from "react";

const NextButton = ({ onClick, disabled, icon, label, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center text-gray-500 hover:text-gray-700 disabled:opacity-50 ${className}`}
    >
      <img src={icon} alt={label} className="w-4 h-4 mr-1" />
      {label}
    </button>
  );
};

export default NextButton;
