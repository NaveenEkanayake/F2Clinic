import React, { useState } from "react";
import Bell from "../../../../assets/images/bell.png";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import AdminNotificationContent from "../AdminNotificationContent";

const AdminNotification = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
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
        <AdminNotificationContent isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default AdminNotification;
