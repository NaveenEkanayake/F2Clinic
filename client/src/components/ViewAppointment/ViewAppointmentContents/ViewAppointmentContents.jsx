import React from "react";
import AppointmentTable from "../AppointmentTable/Appointment";

const ViewAppointmentContents = ({ isSidebarOpen }) => {
  return (
    <div
      className={`mt-8  ${
        isSidebarOpen ? "w-[1470px] ml-10 " : "w-[1760px] ml-10"
      }`}
    >
      <h1 className="text-slate-800 mb-7 font-semibold text-[26px]">
        View Appointments
      </h1>
      <AppointmentTable />
    </div>
  );
};

export default ViewAppointmentContents;
