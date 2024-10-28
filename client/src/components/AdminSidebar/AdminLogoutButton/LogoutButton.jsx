import React from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../../../assets/images/logout.webp";
import { Logoutadmin } from "@/Api/config";
import { toast } from "react-toastify";

const LogoutButton = ({ open }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Logoutadmin();
    if (result && result.message) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/adminlogin");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center py-4 px-4 w-[350px] ${
        open ? "bg-slate-700 hover:bg-blue-600" : "bg-transparent"
      } text-white font-normal rounded-md cursor-pointer gap-1 ${
        !open ? "justify-center" : ""
      }`}
    >
      <img
        src={Logout}
        className="h-6 w-6 mr-2 invert brightness-110"
        alt="Logout Icon"
      />
      {open && <span>Logout</span>}
    </button>
  );
};

export default LogoutButton;
