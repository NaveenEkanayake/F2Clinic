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
        open ? "w-96" : "w-24"
      } flex flex-col h-screen p-5 pt-8 bg-[#081A51] relative transition-all duration-300`}
    >
      <img
        src={Sidebararrow}
        className={`absolute cursor-pointer right-[-17px] top-9 border-4 border-[#081A51] rounded-full ${
          !open ? "rotate-180" : "rotate-0"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-4 items-center">
        <img
          src={logo}
          className={`duration-500 ${open ? "h-14 w-14" : "h-10 w-10"} ${
            !open ? "rotate-[360deg]" : "rotate-0"
          } cursor-pointer`}
          alt="Logo"
        />
        <h1
          className={`origin-center text-white text-[24px] font-normal transition-transform duration-300 ${
            open ? "scale-100" : "scale-0"
          }`}
        >
          Furry Pet Clinic
        </h1>
      </div>
      <ul className="pt-8">
        <SidebarLink
          to="/adminlogin"
          imgSrc={User}
          text="Admin Login"
          open={open}
        />
        <SidebarLink
          to="/customerlogin"
          imgSrc={User}
          text="Customer Login"
          open={open}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
