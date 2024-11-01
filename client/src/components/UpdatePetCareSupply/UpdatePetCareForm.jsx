import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import UpdatePetCareContents from "./UpdateCareContents/UpdatePetCareContents";

const UpdatePetCareForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <UpdatePetCareContents isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default UpdatePetCareForm;
