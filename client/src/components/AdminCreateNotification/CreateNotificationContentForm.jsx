import React from "react";
import NotificationTable from "./NotificationTable/NotificationTable";
import NotificationForm from "./NotificationForm/NotificationForm";

const CreateNotificationContentForm = () => {
  return (
    <>
      <div className="flex flex-row justify-center gap-4 mt-32">
        <div className="h-[700px] w-[900px] bg-white shadow-xl rounded-lg">
          <NotificationTable />
        </div>
        <div className="h-[700px] w-[500px] bg-white shadow-xl rounded-lg">
          <NotificationForm />
        </div>
      </div>
    </>
  );
};

export default CreateNotificationContentForm;
