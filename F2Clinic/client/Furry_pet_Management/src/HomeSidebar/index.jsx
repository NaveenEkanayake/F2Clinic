import React from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";

const HomeSidebar = ({ isSidePanelOpen, toggleSidePanel }) => {
  return (
    <div
      className={`bg-[#0e0e0e] text-gray-100 px-4 transition-all duration-300 ease-in-out ${
        isSidePanelOpen ? "w-full lg:w-72" : "w-16"
      }`}
      style={{
        height: "100vh",
        minWidth: isSidePanelOpen ? "250px" : "50px",
        fontFamily: "Times New Roman,san-serif",
      }}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={toggleSidePanel}
        />
      </div>
      {isSidePanelOpen && (
        <div className="mt-4">
          <Link
            to="/Adminlogin"
            className="flex items-center gap-2 mt-9 hover:bg-blue-500 box-border p-4"
          >
            <FaUserAlt size={20} />
            <h2>Admin Login</h2>
          </Link>
          <Link
            to="/loginCustomer"
            className="flex items-center gap-2 mt-12 hover:bg-blue-500 box-border p-4"
          >
            <FaUserAlt size={20} />
            <h2>Customer Login</h2>
          </Link>
          <Link
            to="/Consultantlogin"
            className="flex items-center gap-2 mt-12 hover:bg-blue-500 box-border p-4"
          >
            <FaUserAlt size={20} />
            <h2>Consultant Login</h2>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeSidebar;
