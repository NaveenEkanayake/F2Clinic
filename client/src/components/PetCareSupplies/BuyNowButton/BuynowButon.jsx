import React from "react";

const BuynowButon = (props) => {
  return (
    <button className=" border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition">
      {props.children}
    </button>
  );
};

export default BuynowButon;
