import React from "react";
import SearchIcon from "../../../assets/images/searchIcons.png";

const Searchbar = () => {
  return (
    <div className="relative w-[400px] ml-10">
      <input
        type="search"
        className="border-2 border-black w-full h-[40px] rounded-lg pl-10 pr-4 outline-none"
        placeholder="Search..."
      />

      <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
        <img src={SearchIcon} className="w-6 h-6 cursor-pointer " />
      </div>
    </div>
  );
};

export default Searchbar;
