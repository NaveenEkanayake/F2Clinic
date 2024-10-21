import React, { useState } from "react";
import DashboardSidebar from "../../components/CustomerDashboardSidebar/DashboardSidebar";
import PetCareContents from "./PetCareContents/PetCareContents";

const PetCareSupplies = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <DashboardSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <h1 className="text-3xl text-slate-600 font-semibold ml-2 text-center">
          Pet Care Supplies
        </h1>
        <PetCareContents isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default PetCareSupplies;
