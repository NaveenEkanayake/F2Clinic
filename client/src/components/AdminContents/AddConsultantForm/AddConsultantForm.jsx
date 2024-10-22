import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import AddConsultantcontent from "../AddConsultantcontent/AddConsultantcontent";

const AddConsultantForm = () => {
  // Add state for controlling the sidebar's open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <AddConsultantcontent isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default AddConsultantForm;
