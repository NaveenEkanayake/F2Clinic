import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import UpdateFormInventoryContents from "./UpdateInventoryContents/UpdateFormInventoryContents";

const UpdateInventoryForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <UpdateFormInventoryContents isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default UpdateInventoryForm;
