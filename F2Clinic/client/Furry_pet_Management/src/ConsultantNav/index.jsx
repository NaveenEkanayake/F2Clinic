import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/avatar.png";
import Logo from "../assets/logo.png";

const ConsultantNav = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between bg-slate-500 py-2 shadow-dark-mild lg:py-4 text-white">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="flex items-center">
          <Link to="/ConsultantDashboard" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-12 pr-5" />
            <span className="font-serif font-bold text-2xl">
              Furry Pet Clinic
            </span>
          </Link>
        </div>

        <div className="flex items-center ml-auto space-x-0">
          <Link
            to="/ConsultantDashboard"
            className="text-white hover:text-sky-400 hover:underline pr-9"
          >
            Home
          </Link>
          <Link
            to="/PetRecord"
            className="text-white hover:text-sky-400 hover:underline pr-9"
          >
            Pet Records
          </Link>
        </div>

        <div className="relative inline-block ml-4">
          <img
            src={Avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border border-white"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          />
          {isSettingsOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="py-1">
                <Link
                  to="/ConsultantSettings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:underline"
                >
                  Profile
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:underline"
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

export default ConsultantNav;
