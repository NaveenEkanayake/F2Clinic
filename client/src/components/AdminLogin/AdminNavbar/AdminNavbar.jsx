import React from "react";
import logo from "../../../assets/images/logo.png";
const AdminNavbar = () => {
  return (
    <div className="py-4 px-2 bg-slate-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <img src={logo} className="w-12 h-auto" alt="Logo" />
          <span className="text-white text-[20px] ml-3">Furry Pet Clinic</span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
