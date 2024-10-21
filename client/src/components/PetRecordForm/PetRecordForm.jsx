import React, { useState } from "react";
import DashboardSidebar from "../../components/CustomerDashboardSidebar/DashboardSidebar";
import PetRecordContent from "../../components/PetRecordForm/PetRecordContent/PetRecordContent";

const PetRecordForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <DashboardSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <PetRecordContent />
      </div>
    </div>
  );
};

export default PetRecordForm;
