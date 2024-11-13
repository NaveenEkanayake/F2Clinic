import React from "react";
import ConsultantTable from "../ViewConsultant/ConsultantTable/ConsultantTable";
import Person from "../../../assets/images/person.png";

const ViewConsultantContent = ({ isSidebarOpen }) => {
  return (
    <div
      className={`mt-8 ${
        isSidebarOpen
          ? "w-full lg:w-[1470px] ml-10"
          : "w-full lg:w-[1760px] ml-10"
      } sm:w-full sm:ml-0 md:w-[90%] md:ml-4 lg:w-[95%]`}
    >
      <div className="flex justify-start items-center flex-wrap">
        <img
          src={Person}
          alt="Consultant"
          className="w-8 h-8 mb-5 filter brightness-150 contrast-150"
        />
        <h1 className="text-slate-600 mb-7 font-semibold text-[26px] md:text-[30px]">
          View Consultants
        </h1>
      </div>
      <ConsultantTable />
    </div>
  );
};

export default ViewConsultantContent;
