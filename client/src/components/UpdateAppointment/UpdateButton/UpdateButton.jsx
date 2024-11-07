import React, { useState, useEffect } from "react";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const UpdateButton = ({ loading, children }) => {
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    <HourglassEmptyIcon className="text-white mr-2" />,
    <HourglassFullIcon className="text-white mr-2" />,
    <HourglassTopIcon className="text-white mr-2" />,
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentIcon((prev) => (prev + 1) % icons.length);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading, icons.length]);

  return (
    <button
      type="submit"
      className={`w-full border border-blue-500 text-blue-500 hover:text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center ${
        loading ? "cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center">
          <span className={`animate-spin`}>{icons[currentIcon]}</span>
          <span className="text-white">Updating Appointment...</span>
        </div>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default UpdateButton;
