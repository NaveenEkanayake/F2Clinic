import React from "react";
import { MdHourglassEmpty } from "react-icons/md"; // Import the hourglass icon

const SubmitButton = ({ loading, children }) => {
  return (
    <button
      disabled={loading}
      className={`py-2 px-10 w-full border-2 text-center border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg ${
        loading ? "cursor-not-allowed opacity-75" : ""
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <MdHourglassEmpty className="animate-spin mr-2" />
          Submitting...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
