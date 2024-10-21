import React from "react";
import AppointmentExpenses from "../AppointmentExpenses/AppointmentExpenses";
import OtherExpenses from "../OtherExpenses/OtherExpenses";
import DoctorTable from "../DoctorTable/DoctorTable";

const DashboardContents = ({ isSidebarOpen }) => {
  return (
    <>
      <div className="flex flex-row ">
        <div
          className={` flex items-center justify-center relative py-24 px-24 mt-2  bg-slate-200 ml-8 rounded-lg transition-all duration-300 shadow-xl ${
            isSidebarOpen ? "h-[109px] w-[470px] " : "h-[109px] w-[565px] "
          }`}
        >
          <div className="flex flex-col">
            <h1 className="text-black text-2xl font-normal items-center justify-center ml-9">
              Total Appointments
            </h1>
            <span
              className=" absolute inset-0 w-full h-4 top-44 bg-blue-600"
              style={{
                borderBottomLeftRadius: "6px",
                borderBottomRightRadius: "6px",
              }}
            ></span>

            <h6 className="text-center text-gray-600 text-2xl mt-8">1</h6>
          </div>
        </div>
        <div
          className={` flex items-center justify-center relative py-24 px-24 mt-2  bg-slate-200 ml-8 rounded-lg transition-all duration-300 shadow-xl ${
            isSidebarOpen ? "h-[109px] w-[470px] " : "h-[109px] w-[565px] "
          }`}
        >
          <div className="flex flex-col">
            <h1 className="text-black text-2xl font-normal items-center justify-center ml-9">
              Total Pet Records
            </h1>
            <span
              className=" absolute inset-0 w-full h-4 top-44 bg-blue-600"
              style={{
                borderBottomLeftRadius: "6px",
                borderBottomRightRadius: "6px",
              }}
            ></span>

            <h6 className="text-center text-gray-600 text-2xl mt-8">1</h6>
          </div>
        </div>
        <div
          className={`flex items-center justify-center relative py-24 px-24 mt-2 bg-slate-200 ml-8 rounded-lg transition-all duration-300 shadow-xl ${
            isSidebarOpen ? "h-[930px] w-[470px]" : "h-[930px] w-[565px]"
          }`}
        >
          <div className="flex flex-col w-full h-full ">
            <h1 className=" mt-[-90px] text-black text-xl font-medium items-center justify-center ml-12 mb-6  text-nowrap">
              Appointment Expenses
            </h1>
            <AppointmentExpenses isSidebarOpen={isSidebarOpen} />
            <OtherExpenses isSidebarOpen={isSidebarOpen} />
          </div>
        </div>
      </div>
      <div
        className={`py-24 px-12 mt-[-650px] ml-8 bg-slate-200 transition-all duration-300 rounded-lg shadow-lg ${
          isSidebarOpen ? "h-[650px] w-[975px]" : "h-[650px] w-[1160px]"
        }`}
      >
        <div className="mt-[-20px] mb-2">
          <h1 className="text-black text-2xl font-medium items-center ml-16 justify-center mt-[-50px] text-nowrap">
            Our Specialists
          </h1>
        </div>
        <DoctorTable />
      </div>
    </>
  );
};

export default DashboardContents;
