import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Avatar from "../assets/avatar.png";

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between bg-slate-500 py-2 shadow-dark-mild lg:py-4 text-white">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="flex items-center">
          <Link to="/Dash" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              style={{ height: "50px", paddingRight: "20px" }}
              className="mr-2"
            />
            <span
              className="font-serif font-normal"
              style={{ color: "white", fontWeight: "bold", fontSize: "23px" }}
            >
              Furry Pet Clinic
            </span>
          </Link>
        </div>
        <div
          className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
          id="navbarSupportedContent4"
        >
          <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"></ul>
          <Link
            to="/Dash"
            className="text-white hover:text-sky-400 hover:underline"
          >
            <div className="flex items-center" style={{ marginLeft: "50px" }}>
              <span className="hover:text-sky-400 hover:underline">Home</span>
            </div>
          </Link>
          <div className="relative inline-block">
            <span
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex justify-center w-full text-white hover:text-sky-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="options-menu"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <span className="hover:text-sky-400 hover:underline pl-20">
                Appointments
              </span>
            </span>
            {isOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  <Link
                    to="/Makeappoint"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:underline"
                    role="menuitem"
                  >
                    Make an Appointment
                  </Link>
                  <Link
                    to="/View"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:underline"
                    role="menuitem"
                  >
                    View an Appointment
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            to="/contactus"
            className="text-white hover:text-sky-400 hover:underline"
          >
            <div className="flex items-center" style={{ marginLeft: "40px" }}>
              <span className="hover:text-sky-400 hover:underline mr-12">
                Contact Us
              </span>
            </div>
          </Link>
        </div>

        {/* Avatar and Settings Dropdown */}
        <div className="relative inline-block ml-4">
          <img
            src={Avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border border-white"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          />
          {isSettingsOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="settings-menu"
            >
              <div className="py-1" role="none">
                <Link
                  to="/Settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:underline"
                  role="menuitem"
                >
                  Profile
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:underline"
                  role="menuitem"
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
