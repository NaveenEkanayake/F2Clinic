import React from "react";
import { Link } from "react-router-dom";

const LoginNavButton = (props) => {
  return (
    <Link
      to="/customerlogin"
      className="border-blue-500 text-blue-500 border-2 px-8 py-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white text-sm sm:text-base lg:text-lg"
    >
      {props.children}
    </Link>
  );
};

export default LoginNavButton;
