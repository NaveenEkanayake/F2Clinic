import React, { useState } from "react";
import SidebarLink from "./SidebarContents/SidebarContents";
import Sidebararrow from "../../assets/images/Sidebararrow.png";
import logo from "../../assets/images/logo.png";
import User from "../../assets/images/User.png";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open
          ? "xl:w-96 lg:w-80 md:w-64 sm:w-56 w-52"
          : "xl:w-24 lg:w-20 md:w-16 sm:w-14 w-20"
      } flex flex-col h-screen p-5 pt-8 bg-[#081A51] relative transition-all duration-300`}
    >
      <img
        src={Sidebararrow}
        className={`absolute cursor-pointer right-[-17px] top-9 border-4 border-[#081A51] rounded-full ${
          !open ? "rotate-180" : "rotate-0"
        } w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 transition-all duration-300`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex xl:gap-4 gap-6 items-center">
        <img
          src={logo}
          className={`duration-500 ${
            open
              ? "xl:h-14 xl:w-14 h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12"
              : "xl:h-10 xl:w-10 h-8 w-12 sm:h-4 sm:w-8 md:h-8 md:w-14"
          } ${!open ? "rotate-[360deg]" : "rotate-0"} cursor-pointer`}
          alt="Logo"
        />
        <h1
          className={`xl:origin-center xl:ml-0 ml-[-20px] text-white text-[24px] md:font-normal font-normal transition-transform duration-300 ${
            open ? "xl:scale-100  text-nowrap" : "scale-0"
          }`}
        >
          Furry Pet Clinic
        </h1>
      </div>
      <ul className="pt-8 space-y-4 sm:space-y-0">
        <SidebarLink
          to="/adminlogin"
          imgSrc={User}
          text="Admin Login"
          open={open}
          className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4"
        />
        <SidebarLink
          to="/customerlogin"
          imgSrc={User}
          text="Customer Login"
          open={open}
          className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4"
        />
      </ul>
    </div>
  );
};

export default Sidebar;
