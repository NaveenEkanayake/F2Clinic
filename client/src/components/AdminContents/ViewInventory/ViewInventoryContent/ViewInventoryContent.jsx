import React from "react";
import InventoryIcon from "../../../../assets/images/Inventory.png";
import ViewInventoryTable from "../ViewInventoryTable/ViewInventoryTable";

const ViewInventoryContent = ({ isSidebarOpen }) => {
  return (
    <div
      className={`mt-8 ${
        isSidebarOpen ? "w-[1470px] ml-10" : "w-[1760px] ml-10"
      }`}
    >
      <div className="flex justify-start items-center">
        <img
          src={InventoryIcon}
          alt="Consultant"
          className="w-8 h-8 mb-5 filter brightness-150 contrast-150 mr-3 "
        />
        <h1 className="text-slate-600 mb-7 font-semibold text-[26px]">
          View Inventory
        </h1>
      </div>
      <ViewInventoryTable />
    </div>
  );
};

export default ViewInventoryContent;
