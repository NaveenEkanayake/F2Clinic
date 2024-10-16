import React from "react";
import logo from "../../assets/images/logo.png";
import NavSignupButton from "../CustomerSignupNavButton/NavSignupButton";
import LoginNavButton from "../LoginNavButton/LoginNavButton";

const LoginNavBar = () => {
  return (
    <div className="py-4 px-2 bg-slate-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <img src={logo} className="w-12 h-auto" alt="Logo" />
          <span className="text-white text-[20px] ml-3">Furry Pet Clinic</span>
        </div>
        <div className="flex text-white items-center">
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
    </div>
  );
};

export default LoginNavBar;
