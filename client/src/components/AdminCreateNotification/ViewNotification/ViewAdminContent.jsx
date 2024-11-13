import React, { useEffect, useState } from "react";
import PreviousButton from "../ViewNotification/PreviousButton/PreviousButton";
import NextButton from "../ViewNotification/NextButton/NextButton";
import { verifyadmin, getAllContactmessages } from "@/Api/config";

const ViewAdminNotificationContent = ({
  isSidebarOpen,
  setNotificationsCount,
}) => {
  const [messages, setMessages] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const indexOfLastMessage = currentPage * itemsPerPage;
  const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
  const currentMessages = messages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const totalPages = Math.ceil(messages.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle the "Read All" button click
  const handleReadAll = () => {
    const updatedMessages = messages.map((message) => ({
      ...message,
      isRead: true, // Mark all as read
    }));
    setMessages(updatedMessages);
    setNotificationsCount(0); // Reset unread count to 0
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const UserResponse = await verifyadmin();
        if (!UserResponse) {
          console.error("Admin verification failed.");
          return;
        }

        const results = await getAllContactmessages();
        if (results && results.data) {
          setMessages(results.data);
          const unreadCount = results.data.filter(
            (notification) => !notification.isRead
          ).length;
          setNotificationsCount(unreadCount);
        } else {
          console.error("No notifications found.");
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [setNotificationsCount]);

  return (
    <>
      <div className="flex justify-end items-center mr-28 mb-4">
        <button
          onClick={handleReadAll}
          className="py-2 px-6 border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 rounded-lg"
        >
          Read all
        </button>
      </div>

      <div className="block">
        {currentMessages.map((notification) => (
          <div
            key={notification._id}
            className={`h-[100px] bg-white ml-10 mt-7 rounded-lg flex items-center text-black shadow-xl p-4 justify-between ${
              isSidebarOpen
                ? "w-full md:w-[98%] lg:w-[98%] xl:w-[90%]"
                : "w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%]"
            }`}
          >
            <div className="flex items-center justify-between flex-1">
              <div className="flex-1">{notification.message}</div>
              {!notification.isRead && (
                <div className="relative h-4 w-4 bg-blue-500 rounded-full ml-4" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5">
        <PreviousButton
          currentPage={currentPage}
          handlePrevious={handlePrevious}
        />
        <NextButton
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
        />
      </div>
    </>
  );
};

export default ViewAdminNotificationContent;
