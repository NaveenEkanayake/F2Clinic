import React from "react";
import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800 bg-opacity-75">
      <Puff height="100" width="100" color="lightblue" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
