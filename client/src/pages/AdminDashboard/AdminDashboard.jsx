import AdminContents from "@/components/AdminContents/AdminContents";
import AdminDashSideBar from "@/components/AdminSidebar/AdminSidebar";
import React, { useState } from "react";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminDashSideBar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <AdminContents isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default AdminDashboard;
