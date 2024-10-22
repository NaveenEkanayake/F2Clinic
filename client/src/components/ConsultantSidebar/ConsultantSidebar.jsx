import React from "react";
import { Link } from "react-router-dom";
import Sidebararrow from "../../assets/images/Sidebararrow.png";
import logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/avatar.png";
import Logout from "../../assets/images/Logout.webp";
import PetRecordsIcon from "../../assets/images/Records.jpg";
import HomeIcon from "../../assets/images/Home.png";

const ConsultantSidebar = ({ open, setOpen }) => {
  return (
    <div
      className={`${
        open ? "w-96" : "w-24"
      } flex flex-col h-screen p-5 pt-8 bg-[#081A51] relative transition-all duration-300`}
    >
      <img
        src={Sidebararrow}
        className={`absolute cursor-pointer right-[-17px] top-9 border-4 border-[#081A51] rounded-full ${
          !open ? "rotate-180" : "rotate-0"
        }`}
        onClick={() => setOpen((prev) => !prev)}
        alt="Toggle Sidebar"
      />
      <Link to="/consultantdashboard" className="flex gap-4 items-center">
        <img
          src={logo}
          className={`duration-500 ${open ? "h-14 w-14" : "h-10 w-10"} ${
            !open ? "rotate-[360deg]" : "rotate-0"
          } cursor-pointer`}
          alt="Logo"
        />
        {open && (
          <span className="origin-center text-white text-[24px] font-normal transition-transform duration-300">
            Furry Pet Clinic
          </span>
        )}
      </Link>
      <div className="flex flex-col items-center mt-8">
        <img
          src={Avatar}
          alt="Avatar"
          className={`rounded-full cursor-pointer ${
            open ? "w-24 h-24" : "w-10 h-10"
          }`}
        />
        {open && (
          <p className="text-white hover:text-blue-500 mt-2 cursor-pointer">
            Add a Profile Pic
          </p>
        )}
      </div>
      <ul className="pt-8 space-y-2">
        <Link
          to="/consultantdashboard"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img
            src={HomeIcon}
            alt="Home Icon"
            className="h-6 w-6 mr-2 invert brightness-110"
          />
          {open && <span>Home</span>}
        </Link>

        <Link
          to="/ConsultantpetRecord"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img
            src={PetRecordsIcon}
            alt="Pet Records"
            className="h-6 w-6 invert brightness-110"
          />
          {open && <span>Pet Records</span>}
        </Link>
      </ul>
      <Link
        to="/logout"
        className={`flex items-center py-4 px-4 ${
          open ? "bg-slate-700 hover:bg-blue-600" : "bg-transparent"
        } text-white font-normal rounded-md cursor-pointer gap-1 mt-auto ${
          !open ? "justify-center" : ""
        }`}
      >
        <img
          src={Logout}
          alt="Logout Icon"
          className="h-6 w-6 mr-2 invert brightness-110"
        />
        {open && <span>Logout</span>}
      </Link>
      <div className="mt-auto text-white">
        {open && (
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Furry Pet Clinic. All Rights
            Reserved.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConsultantSidebar;
