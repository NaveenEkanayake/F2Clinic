import React from "react";
import PetRecordTable from "../PetRecordTable/PetRecordTable";

const ConsultantPetRecordContent = ({ isSidebarOpen }) => {
  return (
    <div
      className={`mt-8 ${
        isSidebarOpen ? "w-[1470px] ml-10" : "w-[1760px] ml-10"
      } sm:w-full sm:ml-0 md:w-[90%] md:ml-4 lg:w-[95%]`}
    >
      <h1 className="text-slate-600 mb-7 font-semibold text-[26px]">
        Pet Records
      </h1>
      <PetRecordTable />
    </div>
  );
};

export default ConsultantPetRecordContent;
