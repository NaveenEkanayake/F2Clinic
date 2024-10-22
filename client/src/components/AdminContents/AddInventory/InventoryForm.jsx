import AdminDashSideBar from "@/components/AdminSidebar/AdminSidebar";
import React, { useState } from "react";
import AddPetCareContent from "../AddPetCare/AddPetcareContent";
import InventoryContent from "./InventoryContent/InventoryContent";
const InventoryForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminDashSideBar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <InventoryContent/>
      </div>
    </div>
  );
};

export default InventoryForm;
