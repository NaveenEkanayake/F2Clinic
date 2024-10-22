import React from "react";

const SubmitButton = (props) => {
  return (
    <button className="py-2 px-6 border-2 text-center border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg">
      {props.children}
    </button>
  );
};

export default SubmitButton;
