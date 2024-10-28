import React from "react";
import HourglassEmpty from "@mui/icons-material/HourglassEmpty";
const SubmitButton = ({ loading, children }) => {
  return (
    <button
      type="submit"
      className="w-full border border-blue-500 text-blue-500 hover:text-white py-2 px-4 rounded hover:bg-blue-600 transition relative"
      disabled={loading}
    >
      {loading ? (
        <>
          <HourglassEmpty style={{ color: "white", marginRight: "8px" }} />
          Submitting...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
