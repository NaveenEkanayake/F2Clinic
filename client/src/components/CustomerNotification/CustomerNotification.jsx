import React, { useState } from "react";
import DashboardSidebar from "../../components/CustomerDashboardSidebar/DashboardSidebar";
import CustomerNotificationContent from "./CutomerNotificationContent/CustomerNotificationContent";
import Bell from "../../assets/images/bell.png";

const CustomerNotification = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <DashboardSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <div className="flex items-center ml-5">
          <img src={Bell} className="w-6 h-6 mr-2 " alt="Bell Icon" />
          <h1 className="text-slate-600 mb-2 font-semibold text-[26px]">
            Notifications
          </h1>
        </div>
        <CustomerNotificationContent isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default CustomerNotification;
