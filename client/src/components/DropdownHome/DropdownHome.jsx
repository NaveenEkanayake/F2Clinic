import React, { useState, useEffect } from "react";
import Avatar from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";
import { verifyCustomer } from "../../Api/config";

const DropdownHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    verifyCustomer()
      .then((data) => setUser(data.user))
      .catch((error) => console.error(error));
  }, []);

  return (
    <li className="relative inline-block" onClick={toggleDropdown}>
      <img
        src={Avatar}
        alt="User Avatar"
        className="w-[36px] h-[36px] rounded-full invert brightness-110 cursor-pointer"
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          <div className="p-2" onClick={(e) => e.stopPropagation()}>
            <p className="text-gray-500">
              Welcome !!!!,
              <span className="text-gray-500 hover:text-blue-500 cursor-pointer text-nowrap">
                {user ? ` ${user.fullname.trim()}` : " Guest"}
              </span>
            </p>
          </div>
          <Link
            to="/customerdashboard"
            className="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </li>
  );
};

export default DropdownHome;
