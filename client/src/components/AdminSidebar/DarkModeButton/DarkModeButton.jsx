import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [darkMode]);

  return (
    <div
      className="flex justify-center  py-2 px-6 hover:bg-gray-700 hover:text-white rounded-lg cursor-pointer"
      onClick={toggleDarkMode}
    >
      <span className="flex items-center">
        {darkMode ? (
          <FaSun className="text-yellow-500 w-5 h-5" />
        ) : (
          <FaMoon className="text-gray-800 w-5 h-5" />
        )}
        <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </span>
      <input
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
        className="toggle-checkbox hidden"
      />
    </div>
  );
};

export default DarkModeButton;
