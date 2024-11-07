import React, { useState } from "react";
import DashboardSidebar from "../../DashboardSidebar";
import PaymentContents from "./PaymentContents";

const PaymentForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <DashboardSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <PaymentContents isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default PaymentForm;
