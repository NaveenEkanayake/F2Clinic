import React from "react";

const SubmitButton = (props) => {
  return (
    <button
      type="submit"
      className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white py-2 px-8 rounded-lg"
    >
      {props.children}
    </button>
  );
};

export default SubmitButton;
