import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import UpdateConsultantContents from "./UpdateConsultantContent/UpdateConsultantContent";

const UpdateConsultantForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <UpdateConsultantContents isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default UpdateConsultantForm;
