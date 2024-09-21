import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div
      className={`bg-[#0e0e0e] text-gray-100 px-4 transition-all duration-300 ease-in-out ${
        isSidePanelOpen ? "w-full lg:w-72" : "w-16"
      }`}
      style={{
        height: "100vh",
        minWidth: isSidePanelOpen ? "250px" : "50px",
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
            to="/Admin"
            className="flex items-center gap-2 mt-9 hover:bg-blue-500 box-border p-4"
          >
            <IoHomeOutline size={20} />
            <h2>Home</h2>
          </Link>
          <Link
            to="/Inventory"
            className="flex items-center gap-2 mt-12 hover:bg-blue-500 box-border p-4"
          >
            <FaUserAlt size={20} />
            <h2>Inventory</h2>
          </Link>
          <Link to="/Addconsultant">
            <button
              className="mt-3 bg-blue-300 hover:bg-gray-300 rounded-full py-2 px-4"
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                marginTop: "90px",
                marginLeft: "40px",
              }}
            >
              Add Consultant
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
