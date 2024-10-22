import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import ViewConsultantContent from "../ViewConsultantContent/ViewConsultantContent";

const ViewConsultant = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <ViewConsultantContent isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default ViewConsultant;
