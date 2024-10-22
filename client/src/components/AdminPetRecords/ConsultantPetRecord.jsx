import { useState } from "react";
import ConsultantSidebar from "../ConsultantSidebar/ConsultantSidebar";
import ConsultantPetRecordContent from "./AdminPetRecordContent/ConsultantPetRecordContent";

const ConsultantPetRecord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <ConsultantSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-grow">
        <ConsultantPetRecordContent isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default ConsultantPetRecord;
