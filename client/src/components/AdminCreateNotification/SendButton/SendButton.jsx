import React from "react";
import HourglassEmpty from "@mui/icons-material/HourglassEmpty";

const SendButton = ({ loading, children }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-4 px-4 border border-blue-500 text-blue-500 font-semibold rounded-lg 
                  hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
                  flex items-center justify-center`}
    >
      {loading ? (
        <>
          <HourglassEmpty
            className={`animate-spin mr-2`}
            style={{ fontSize: 20 }}
          />
          Sending...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SendButton;
