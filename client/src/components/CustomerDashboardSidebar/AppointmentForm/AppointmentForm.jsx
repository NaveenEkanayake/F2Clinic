import React, { useState } from "react";
import DashboardSidebar from "../../../components/CustomerDashboardSidebar/DashboardSidebar";
import AppointmentContents from "./AppointmentContents/AppointmentContents";

const AppointmentForm= () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <DashboardSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <AppointmentContents isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default AppointmentForm;
