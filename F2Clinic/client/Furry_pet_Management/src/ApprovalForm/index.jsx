import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ApprovalForm = ({ onClose }) => {
  const [approval, setApproval] = useState("approve");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Approval:", approval);
    console.log("Message:", message);
    onClose(); // Close the form after submission
  };

  return (
    <div
      className="bg-white p-5 rounded-lg shadow-lg  mx-auto"
      style={{
        width: "600px",
        fontFamily: "Times New Roman,sans-serif",
      }}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Approval Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Approval</label>
          <select
            value={approval}
            onChange={(e) => setApproval(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="approve">Approve</option>
            <option value="reject">Reject</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded p-2 w-full"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="flex items-center bg-blue-500 text-white rounded px-4 py-2 text-center"
        >
          <FaPaperPlane className="mr-2" /> Send
        </button>
      </form>
    </div>
  );
};

export default ApprovalForm;
