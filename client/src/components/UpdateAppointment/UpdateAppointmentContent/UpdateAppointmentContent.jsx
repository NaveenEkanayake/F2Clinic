import DashboardSidebar from "@/components/CustomerDashboardSidebar/DashboardSidebar";
import React, { useState } from "react";
import UpdateAppointmentForm from "../UpdateFormContent/UpdateAppointmentForm";

const UpdateAppointmentContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <DashboardSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <UpdateAppointmentForm isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default UpdateAppointmentContent;
