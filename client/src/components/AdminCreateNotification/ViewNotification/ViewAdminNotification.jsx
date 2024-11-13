import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import ViewAdminNotificationContent from "./ViewAdminContent";
import Bell from "../../../assets/images/bell.png";

const ViewAdminNotification = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notificationsCount, setNotificationsCount] = useState(0);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminSidebar
          notificationsCount={notificationsCount}
          open={isSidebarOpen}
          setOpen={setIsSidebarOpen}
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center ml-5">
          <img
            src={Bell}
            className="w-6 h-6 mr-2 filter invert grayscale brightness-50 contrast-50"
            alt="Bell Icon"
          />

          <h1 className="text-slate-600 mb-2 font-semibold text-[26px]">
            Notifications
          </h1>
        </div>
        <ViewAdminNotificationContent
          setNotificationsCount={setNotificationsCount}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
};

export default ViewAdminNotification;
