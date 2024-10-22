import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import ViewPetCareContent from "./ViewPetCareContent/ViewPetCareContent";

const ViewPetCare = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <AdminSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <ViewPetCareContent isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default ViewPetCare;
