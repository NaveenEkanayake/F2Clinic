import React from "react";

const PreviousButton = ({ onBack, children }) => {
  return (
    <button
      type="button"
      onClick={onBack}
      className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white py-2 px-10 rounded-lg"
    >
      {children}
    </button>
  );
};

export default PreviousButton;
