import React, { useState } from "react";
import ConsultantSidebar from "@/components/ConsultantSidebar/ConsultantSidebar";
import ConsultantDashboardContents from "@/components/ConsultantDahboardContents/ConsultantDashboardContents";

const ConsultantDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <ConsultantSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <ConsultantDashboardContents isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default ConsultantDashboard;
