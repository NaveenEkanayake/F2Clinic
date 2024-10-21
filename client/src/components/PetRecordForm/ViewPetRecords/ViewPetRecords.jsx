import React, { useState } from "react";
import DashboardSidebar from "../../../components/CustomerDashboardSidebar/DashboardSidebar";
import ViewPetRecordContent from "../ViewPetRecordContent/ViewPetRecordContent";

const ViewPetRecords = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <DashboardSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <ViewPetRecordContent isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default ViewPetRecords;
