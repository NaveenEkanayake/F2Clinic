import React, { useState } from "react";
import SendButton from "../SendButton/SendButton";
import { Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import {
  SendConsultantNotification,
  SendCustomerNotification,
} from "@/Api/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NotificationForm = () => {
  const [isConsultantForm, setIsConsultantForm] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsConsultantForm((prev) => !prev);
  };

  const handleConsultantSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await SendConsultantNotification({ email, message });
      console.log("Notification successfully created to Consultant!!!", result);
      toast.success("Notification successfully created to Consultant!!!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/admindashboard");
      }, 3000);
    } catch (err) {
      toast.error("Notification creation failed.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await SendCustomerNotification({
        email,
        message,
      });
      console.log("Notification successfully created for Customer!!!", result);
      toast.success("Notification successfully created for Customer!!!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/admindashboard");
      }, 3000);
    } catch (err) {
      toast.error("Notification creation failed.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center p-12 bg-gray-100 rounded-lg shadow-md w-full max-w-lg h-[690px] mx-auto mt-3">
      <SwapHorizIcon
        className="absolute top-4 right-4 cursor-pointer"
        style={{ fontSize: 30 }}
        onClick={toggleForm}
      />

      <Typography variant="h5" className="mb-4">
        {isConsultantForm
          ? "Consultant Notification Form"
          : "Customer Notification Form"}
      </Typography>

      {isConsultantForm ? (
        <form className="w-full mt-4" onSubmit={handleConsultantSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg focus:outline-none"
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-7 py-7 border rounded-lg focus:outline-none"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <SendButton loading={loading}>Send Notification</SendButton>
        </form>
      ) : (
        <form className="w-full mt-4" onSubmit={handleCustomerSubmit}>
          <div className="mb-4">
            <label
              htmlFor="customerEmail"
              className="block text-gray-700 font-medium mb-2"
            >
              Customer Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border rounded-lg focus:outline-none"
              placeholder="Enter customer email address"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="customerMessage"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-7 py-7 border rounded-lg focus:outline-none"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <SendButton loading={loading}>Send Notification</SendButton>
        </form>
      )}
    </div>
  );
};

export default NotificationForm;
