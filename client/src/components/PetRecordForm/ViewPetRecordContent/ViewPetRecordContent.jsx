import React from "react";
import ViewPetTable from "../ViewPetTable/ViewPetTable";

const ViewPetRecordContent = ({ isSidebarOpen }) => {
  return (
    <div
      className={`mt-8 ${
        isSidebarOpen ? "w-[1470px] ml-10" : "w-[1760px] ml-10"
      } sm:w-full sm:ml-0 md:w-[90%] md:ml-4 lg:w-[95%]`}
    >
      <h1 className="text-slate-600 mb-7 font-semibold text-[26px]">
        View Pet Records
      </h1>
      <ViewPetTable />
    </div>
  );
};

export default ViewPetRecordContent;
