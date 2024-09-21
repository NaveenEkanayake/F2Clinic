import React, { useState, useEffect, useRef } from "react";
import HomeSidebar from "../HomeSidebar/index";
import NavHome from "../NavHome/index";
import Cover from "../assets/Bakmainportal.jpg";

const Mainportal = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const inputRef = useRef(null);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsSidePanelOpen(false);
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden">
      <img
        src={Cover}
        alt="Background Cover"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <NavHome />
      <div
        className={`flex-grow flex relative z-10 transition-all duration-300 ease-in-out ${
          isSidePanelOpen ? "lg:ml-0" : "lg:ml-0"
        }`}
        style={{
          minWidth: isSidePanelOpen ? "50px" : "50px",
        }}
      >
        <HomeSidebar
          isSidePanelOpen={isSidePanelOpen}
          toggleSidePanel={toggleSidePanel}
        />
      </div>
    </div>
  );
};

export default Mainportal;
