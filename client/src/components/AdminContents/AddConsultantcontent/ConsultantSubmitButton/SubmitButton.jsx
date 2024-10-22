import React from "react";

const SubmitButton = (props) => {
  return (
    <button
      type="submit"
      className="w-full border border-blue-500 text-blue-500 hover:text-white py-2 px-4 rounded hover:bg-blue-600 transition"
    >
      {props.children}
    </button>
  );
};

export default SubmitButton;
