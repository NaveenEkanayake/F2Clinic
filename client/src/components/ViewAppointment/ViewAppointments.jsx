import React, { useState } from "react";
import DashboardSidebar from "../../components/CustomerDashboardSidebar/DashboardSidebar";
import ViewAppointmentContents from "./ViewAppointmentContents/ViewAppointmentContents";

const ViewAppointment = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <DashboardSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <ViewAppointmentContents isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default ViewAppointment;
