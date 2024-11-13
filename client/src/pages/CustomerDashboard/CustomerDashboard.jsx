import React, { useState } from "react";
import DashboardSidebar from "../../components/CustomerDashboardSidebar/DashboardSidebar";
import DashboardContents from "../../components/CustomerDashboardSidebar/CustomerDashboardContents/DashboardContents";

const CustomerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <div className="flex-none ">
        <DashboardSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <DashboardContents isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default CustomerDashboard;
