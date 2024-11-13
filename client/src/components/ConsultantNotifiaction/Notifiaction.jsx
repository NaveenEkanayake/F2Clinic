import React, { useState } from "react";
import ConsultantSidebar from "../ConsultantSidebar/ConsultantSidebar";
import ConsultantNotificationContent from "./ConsultantNotificationContent/NotificationContent";
import Bell from "../../assets/images/bell.png";

const ConsultantNotification = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notificationsCount, setNotificationsCount] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className={`lg:flex-none ${isSidebarOpen ? "block" : "hidden"}`}>
        <ConsultantSidebar
          notificationsCount={notificationsCount}
          open={isSidebarOpen}
          setOpen={setIsSidebarOpen}
        />
      </div>
      {/* Main Content */}
      <div className="flex-grow p-4">
        <div className="flex items-center mb-4">
          <img
            src={Bell}
            className="w-6 h-6 mr-2 filter invert grayscale brightness-50 contrast-50"
            alt="Bell Icon"
          />
          <h1 className="text-slate-600 font-semibold text-[26px]">
            Notifications
          </h1>
        </div>
        <ConsultantNotificationContent
          setNotificationsCount={setNotificationsCount}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
};

export default ConsultantNotification;
