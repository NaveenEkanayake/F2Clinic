import React, { useState } from "react";
import AdminDashSideBar from "@/components/AdminSidebar/AdminSidebar";
import CreateNotificationContentForm from "./CreateNotificationContentForm";

const CreateNotificationForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminDashSideBar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <CreateNotificationContentForm />
      </div>
    </div>
  );
};

export default CreateNotificationForm;
