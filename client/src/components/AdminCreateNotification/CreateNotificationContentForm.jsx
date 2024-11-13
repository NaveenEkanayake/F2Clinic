import React from "react";
import NotificationTable from "./NotificationTable/NotificationTable";
import NotificationForm from "./NotificationForm/NotificationForm";

const CreateNotificationContentForm = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center gap-4 mt-32">
        {/* Notification Table */}
        <div className="h-[700px] w-[900px] bg-white shadow-xl rounded-lg order-2 lg:order-1">
          <NotificationTable />
        </div>
        {/* Notification Form */}
        <div className="h-[700px] w-[500px] bg-white shadow-xl rounded-lg order-1 lg:order-2">
          <NotificationForm />
        </div>
      </div>
    </>
  );
};

export default CreateNotificationContentForm;
