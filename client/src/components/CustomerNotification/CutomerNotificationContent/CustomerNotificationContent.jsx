import React, { useState } from "react";

const CustomerNotificationContent = ({ isSidebarOpen }) => {
  const messages = [
    { id: 1, content: "Message 1" },
    { id: 2, content: "Message 2" },
    { id: 3, content: "Message 3" },
    { id: 4, content: "Message 4" },
    { id: 5, content: "Message 5" },
    { id: 6, content: "Message 6" },
    { id: 7, content: "Message 7" },
    { id: 8, content: "Message 8" },
    { id: 9, content: "Message 9" },
    { id: 10, content: "Message 10" },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <>
      <div className="flex justify-end items-center">
        <button className="py-2 px-6 border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 rounded-lg mr-12">
          Read all
        </button>
      </div>

      <div className="block">
        {currentMessages.map((message) => (
          <div
            key={message.id}
            className={` h-[100px] bg-white ml-8 mt-7 rounded-lg flex items-center text-black shadow-xl p-4 ${
              isSidebarOpen ? "w-[1450px]" : "w-[1750px]"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded disabled:opacity-50 ml-11"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded disabled:opacity-50 mr-11"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CustomerNotificationContent;
