import React, { useState } from "react";
import Avatar from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";

const DropdownHome = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li className="relative inline-block">
      <img
        src={Avatar}
        alt="User Avatar"
        className="w-[36px] h-[36px] rounded-full invert brightness-110 cursor-pointer"
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg cursor-pointer">
          <div className="p-2">
            <p className="text-gray-500 hover:text-blue-500 cursor-pointer">
              Welcome, User!!!
            </p>
          </div>
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
          >
            Dashboard
          </Link>
        </div>
      )}
    </li>
  );
};

export default DropdownHome;
