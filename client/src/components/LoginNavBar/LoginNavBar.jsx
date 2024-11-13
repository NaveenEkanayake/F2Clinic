import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import NavSignupButton from "../CustomerSignupNavButton/NavSignupButton";
import LoginNavButton from "../LoginNavButton/LoginNavButton";
import MenuIcon from "@mui/icons-material/Menu";

const LoginNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="py-4 px-2 bg-slate-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <img src={logo} className="w-12 h-auto" alt="Logo" />
          <span className="text-white text-[20px] ml-3">Furry Pet Clinic</span>
        </div>
        <div className="block lg:hidden">
          <MenuIcon
            className="text-white cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <div className="hidden lg:flex text-white items-center">
          <ul className="flex space-x-6 items-center">
            <li>
              <LoginNavButton>Login</LoginNavButton>
            </li>
            <li>
              <NavSignupButton>Signup</NavSignupButton>
            </li>
          </ul>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden mt-4">
          <ul className="flex flex-col gap-4 space-y-3 items-end">
            <li>
              <LoginNavButton>Login</LoginNavButton>
            </li>
            <li>
              <NavSignupButton>Signup</NavSignupButton>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoginNavBar;
