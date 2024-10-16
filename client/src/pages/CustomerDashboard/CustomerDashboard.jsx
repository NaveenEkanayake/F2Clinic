import React from "react";
import DashboardSidebar from "../../components/CustomerDashboardSidebar/DashboardSidebar";

const CustomerDashboard = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="flex-none">
          <DashboardSidebar />
        </div>
        <div className="flex-grow h-full ">{/* <MainHomeContents /> */}</div>
      </div>
    </>
  );
};

export default CustomerDashboard;
