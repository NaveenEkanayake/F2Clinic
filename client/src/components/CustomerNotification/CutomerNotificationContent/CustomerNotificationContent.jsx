import React, { useEffect, useState } from "react";
import PreviousButton from "../PreviousButton/PreviousButton";
import NextButton from "../NextButton/NextButton";
import {
  verifyCustomer,
  getAllNotifications,
  ISReadAllNotifications,
} from "@/Api/config";

const CustomerNotificationContent = ({
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

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const UserResponse = await verifyCustomer();
        if (!UserResponse) {
          console.error("User verification failed.");
          return;
        }

        const results = await getAllNotifications();
        if (results && results.notifications) {
          setMessages(results.notifications);
          const unreadCount = results.notifications.filter(
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
  const handleReadAll = async () => {
    try {
      await ISReadAllNotifications();
      setMessages((prevMessages) =>
        prevMessages.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                ? "w-[100%] md:w-[98%] lg:w-[98%] xl:w-[90%]"
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

export default CustomerNotificationContent;
