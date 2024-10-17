import React from "react";

const AppointmentNextButton = ({ currentForm, setCurrentForm, children }) => {
  const handleNextClick = () => {
    if (currentForm === "appointment") {
      setCurrentForm("personalDetails");
    } else {
      console.log("Submitting the forms");
    }
  };

  return (
    <button
      type="button"
      onClick={handleNextClick}
      className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white py-2 px-8 rounded-lg outline-none"
    >
      {children}
    </button>
  );
};

export default AppointmentNextButton;
