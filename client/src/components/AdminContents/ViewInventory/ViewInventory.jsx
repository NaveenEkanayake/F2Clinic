import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import ViewInventoryContent from "./ViewInventoryContent/ViewInventoryContent";

const ViewInventory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <ViewInventoryContent isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default ViewInventory;
