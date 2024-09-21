import React, { useState } from "react";
import ApprovalForm from "../ApprovalForm/index"; // Ensure the path is correct

const ConsultantTable = ({ isDarkMode }) => {
  const [showForm, setShowForm] = useState(false);

  const handleActionClick = () => {
    setShowForm(true); // Show the approval form
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the approval form
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <table
        className="min-w-full table-auto"
        style={{
          fontFamily: "Times New Roman, sans-serif",
          outline: "none",
          border: "none",
        }}
      >
        <thead>
          <tr className="bg-gray-200 rounded-xl">
            <th className="px-4 py-2" style={{ border: "none" }}>
              ID
            </th>
            <th className="px-4 py-2" style={{ border: "none" }}>
              Doctor Name
            </th>
            <th className="px-4 py-2" style={{ border: "none" }}>
              Date
            </th>
            <th className="px-4 py-2" style={{ border: "none" }}>
              Time
            </th>
            <th className="px-4 py-2" style={{ border: "none" }}>
              Special Concerns
            </th>
            <th className="px-4 py-2" style={{ border: "none" }}>
              Payment Status
            </th>
            <th className="px-4 py-2" style={{ border: "none" }}>
              Appointment Status
            </th>
            <th className="px-4 py-2" style={{ border: "none" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className={`px-4 py-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ border: "none" }}
            >
              1
            </td>
            <td
              className={`px-4 py-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ border: "none" }}
            >
              Dr. Example
            </td>
            <td
              className={`px-4 py-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ border: "none" }}
            >
              2024-09-21
            </td>
            <td
              className={`px-4 py-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ border: "none" }}
            >
              10:00 AM
            </td>
            <td
              className={`px-4 py-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ border: "none" }}
            >
              High blood pressure
            </td>
            <td
              className={`px-4 py-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ border: "none" }}
            >
              Paid
            </td>
            <td
              className={`px-4 py-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ border: "none" }}
            >
              Pending
            </td>
            <td
              className={`px-4 py-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ border: "none" }}
            >
              <button
                onClick={handleActionClick}
                className="border border-red-500 text-red-500 rounded-3xl px-4 py-1 hover:bg-red-500 hover:text-white"
              >
                Action
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <ApprovalForm onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default ConsultantTable;
