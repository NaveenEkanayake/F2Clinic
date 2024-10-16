import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MainHomeContents from "../../components/MainHomeContents/MainHomeContents";

const MainHome = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex-grow h-full ">
        <MainHomeContents />
      </div>
    </div>
  );
};

export default MainHome;
