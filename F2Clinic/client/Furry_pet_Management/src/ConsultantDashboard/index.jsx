import React from "react";
import ConsultantNav from "../ConsultantNav";
import ApReject from "../Approve,Reject_Appointments";
import ConsultantTable from "../ConsultantTable1/index";

const ConsultantDashboard = () => {
  return (
    <div className="bg-slate-200 min-h-screen">
      <ConsultantNav />
      <ApReject />
      <ConsultantTable />
    </div>
  );
};

export default ConsultantDashboard;
