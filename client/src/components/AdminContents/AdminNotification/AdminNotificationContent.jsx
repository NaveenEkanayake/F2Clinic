import React, { useState, useEffect } from "react";
import PreviousButton from "./PrevButton/PrevButton";
import NextButton from "./NextButton/NextButton";
import { io } from "socket.io-client";

const AdminNotificationContent = ({ isSidebarOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const socketRef = React.useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", { withCredentials: true });

    socketRef.current.on("connect", () => {
      console.log("Connected to socket with ID:", socketRef.current.id);
    });

    socketRef.current.on("addConsultantNotification", (data) => {
      console.log("Consultant Notification received:", data);
      if (data && data.message) {
        setNotifications((prev) => [...prev, data.message]);
      }
    });

    socketRef.current.on("adminMessage", (data) => {
      console.log("Admin Notification received:", data);
      if (data && data.message) {
        setNotifications((prev) => [...prev, data.message]);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, []);

  // Pagination logic
  const indexOfLastMessage = currentPage * itemsPerPage;
  const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

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

  return (
    <div
      className={`flex flex-col p-4 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"}`}
    >
      <div className="flex justify-end mb-4">
        <button className="py-2 px-6 border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 rounded-lg">
          Read all
        </button>
      </div>

      <div className="flex flex-col">
        {notifications
          .slice(indexOfFirstMessage, indexOfLastMessage)
          .map((notification, index) => (
            <div
              key={index}
              className={`h-[100px] bg-white ml-8 mt-3 rounded-lg flex items-center text-black shadow-xl p-4 ${
                isSidebarOpen ? "w-[80%]" : "w-[90%]"
              }`}
            >
              <div className="flex-1">{notification}</div>
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
    </div>
  );
};

export default AdminNotificationContent;
