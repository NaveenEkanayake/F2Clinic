import React from "react";
import supply from "../../../../../assets/images/supply.png";
import SupplyTable from "../PetCareSupplyTable/SupplyTable";

const ViewPetCareContent = ({ isSidebarOpen }) => {
  return (
    <div
      className={`mt-8 ${
        isSidebarOpen ? "w-[1470px] ml-10" : "w-[1760px] ml-10"
      }`}
    >
      <div className="flex justify-start items-center gap-2">
        <img
          src={supply}
          alt="Consultant"
          className="w-8 h-8 mb-5 filter contrast-150  "
        />
        <h1 className="text-slate-600 mb-7 font-semibold text-[26px]">
          View Pet Care Supply
        </h1>
      </div>
      <SupplyTable />
    </div>
  );
};

export default ViewPetCareContent;
