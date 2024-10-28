import React from "react";
import { PuffLoader as Spinner } from "react-spinners";

const PuffLoader = ({ loading, size = 60, color = "#5BAAEC" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Spinner loading={loading} size={size} color={color} />
    </div>
  );
};

export default PuffLoader;
