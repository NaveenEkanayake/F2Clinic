import React from "react";
import InventoryIcon from "../../../../assets/images/Inventory.png";
import ViewInventoryTable from "../ViewInventoryTable/ViewInventoryTable";

const ViewInventoryContent = ({ isSidebarOpen }) => {
  return (
    <div
      className={`mt-8 ${
        isSidebarOpen
          ? "w-full lg:w-[1570px] ml-10"
          : "w-full lg:w-[1760px] ml-10"
      } sm:w-full sm:ml-0 md:w-[90%] md:ml-4 lg:w-[95%]`}
    >
      <div className="flex justify-start items-center flex-wrap mb-7">
        <img
          src={InventoryIcon}
          alt="Inventory"
          className="w-8 h-8 mb-5 filter brightness-150 contrast-150 mr-3"
        />
        <h1 className="text-slate-600 font-semibold text-[26px] md:text-[30px]">
          View Inventory
        </h1>
      </div>

      <div className="w-full">
        <ViewInventoryTable />
      </div>
    </div>
  );
};

export default ViewInventoryContent;
