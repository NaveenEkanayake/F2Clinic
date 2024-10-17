import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebararrow from "../../assets/images/Sidebararrow.png";
import logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/avatar.png";
import AppointmentIcon from "../../assets/images/Records.jpg";
import PetRecordsIcon from "../../assets/images/Records.jpg";
import Setting from "../../assets/images/settings.jpg";
import Logout from "../../assets/images/Logout.webp";
import Notification from "../../assets/images/Notification.png";
import Supplies from "../../assets/images/PetEssentials.webp";

const DashboardSidebar = ({ open, setOpen }) => {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isPetRecordsOpen, setIsPetRecordsOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(1);

  const toggleAppointmentDropdown = () =>
    setIsAppointmentOpen(!isAppointmentOpen);
  const togglePetRecordsDropdown = () => setIsPetRecordsOpen(!isPetRecordsOpen);

  return (
    <div
      className={`${
        open ? "w-96" : "w-24"
      } flex flex-col h-screen p-5 pt-8 bg-[#081A51] relative transition-all duration-300`}
    >
      <img
        src={Sidebararrow}
        className={`absolute cursor-pointer right-[-17px] top-9 border-4 border-[#081A51] rounded-full ${
          !open ? "rotate-180" : "rotate-0"
        }`}
        onClick={() => setOpen(!open)}
        alt="Toggle Sidebar"
      />
      <div className="flex gap-4 items-center">
        <img
          src={logo}
          className={`duration-500 ${open ? "h-14 w-14" : "h-10 w-10"} ${
            !open ? "rotate-[360deg]" : "rotate-0"
          } cursor-pointer`}
          alt="Logo"
        />
        {open && (
          <h1 className="origin-center text-white text-[24px] font-normal transition-transform duration-300">
            Furry Pet Clinic
          </h1>
        )}
      </div>
      <div className="flex flex-col items-center mt-8">
        <img
          src={Avatar}
          alt="Profile Avatar"
          className={`rounded-full cursor-pointer ${
            open ? "w-24 h-24" : "w-10 h-10"
          }`}
        />
        {open && (
          <p className="text-white hover:text-blue-500 mt-2 cursor-pointer">
            Add a Profile Pic
          </p>
        )}
      </div>
      <ul className="pt-8 space-y-2">
        <div className="text-white">
          <div
            onClick={toggleAppointmentDropdown}
            className={`flex items-center py-4 px-4 hover:bg-blue-500 font-normal rounded-md cursor-pointer ${
              !open ? "justify-center" : ""
            }`}
          >
            <img
              src={AppointmentIcon}
              className={`w-5 h-5 mr-2 invert brightness-110 ${
                open ? "w-5 h-5" : "w-10 h-10"
              }`}
              alt="Appointment"
            />
            {open && <span>Appointment</span>}
          </div>
          {isAppointmentOpen && open && (
            <ul className="ml-6 space-y-2">
              <Link
                to="/appointment"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                Make Appointment
              </Link>
              <Link
                to="/viewappointment"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                View Appointment
              </Link>
            </ul>
          )}
        </div>
        <div className="text-white">
          <div
            onClick={togglePetRecordsDropdown}
            className={`flex items-center py-4 px-4 hover:bg-blue-500 font-normal rounded-md cursor-pointer ${
              !open ? "justify-center" : ""
            }`}
          >
            <img
              src={PetRecordsIcon}
              className="w-5 h-5 mr-2 invert brightness-110"
              alt="Pet Records"
            />
            {open && <span>Pet Records</span>}
          </div>
          {isPetRecordsOpen && open && (
            <ul className="ml-6 space-y-2">
              <Link
                to="/add-pet-records"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                Add Pet Records
              </Link>
              <Link
                to="/view-pet-records"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                View Pet Records
              </Link>
            </ul>
          )}
        </div>

        <Link
          to="/settings"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img
            src={Supplies}
            alt="Settings Icon"
            className="h-6 w-6 mr-2 invert brightness-110"
          />
          {open && <span>Pet Care Supplies</span>}
        </Link>
        <Link
          to="/Notifications"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img
            src={Notification}
            alt="Settings Icon"
            className="h-6 w-6 brightness-110"
          />
          {notificationsCount > 0 && (
            <span className="absolute  mb-[20px] right-6 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {notificationsCount}
            </span>
          )}
          {open && <span>Notification</span>}
        </Link>

        <Link
          to="/settings"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img
            src={Setting}
            alt="Settings Icon"
            className="h-6 w-6 mr-2 invert brightness-110"
          />
          {open && <span>Settings</span>}
        </Link>
      </ul>
      <Link
        to="/logout"
        className={`flex items-center py-4 px-4 ${
          open ? "bg-slate-700 hover:bg-blue-600" : "bg-transparent"
        } text-white font-normal rounded-md cursor-pointer gap-1 mt-auto ${
          !open ? "justify-center" : ""
        }`}
      >
        <img
          src={Logout}
          alt="Logout Icon"
          className="h-6 w-6 mr-2 invert brightness-110"
        />
        {open && <span>Logout</span>}
      </Link>
      <div className="mt-auto text-white">
        {open && (
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Furry Pet Clinic. All Rights
            Reserved.
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
