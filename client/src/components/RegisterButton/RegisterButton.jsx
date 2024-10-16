import React from "react";
import { IoLogInOutline } from "react-icons/io5";

const RegisterButton = (props) => {
  return (
    <button
      type="submit"
      className="w-full ml-6 py-4 mt-4 bg-white/70 hover:bg-blue-500 text-white rounded-lg  transition duration-300 flex items-center justify-center text-center text-[18px]"
    >
      <IoLogInOutline className="mr-2" />
      {props.children}
    </button>
  );
};

export default RegisterButton;
