import React, { useState } from "react";
import DashboardSidebar from "../CustomerDashboardSidebar/DashboardSidebar";
import UpdatePetRecordContent from "./UpdatePetRecordContent/UpdatePetRecordContent";

const UpdatePetRecordForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <DashboardSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <UpdatePetRecordContent />
      </div>
    </div>
  );
};

export default UpdatePetRecordForm;
