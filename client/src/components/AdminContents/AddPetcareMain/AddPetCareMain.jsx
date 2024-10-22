import AdminDashSideBar from "@/components/AdminSidebar/AdminSidebar";
import React, { useState } from "react";
import AddPetCareContent from "../AddPetCare/AddPetcareContent";

const AddPetCareMain = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminDashSideBar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <AddPetCareContent />
      </div>
    </div>
  );
};

export default AddPetCareMain;
