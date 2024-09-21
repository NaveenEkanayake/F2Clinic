import React from "react";
import contactus from "../assets/Contactus.png";
import UserNav from "../UserNav/index";
import { FiSend } from "react-icons/fi"; // Importing the Send icon

const ContactUs = () => {
  return (
    <>
      <UserNav />
      <div
        className="flex flex-col md:flex-row justify-between items-center bg-slate-200 p-8 min-h-screen"
        style={{
          fontFamily: "Times New Roman,sans-serif",
        }}
      >
        {/* Contact Form on the Left */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block mb-2 text-lg">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-lg">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full p-3 flex items-center justify-center border-2 border-blue-500 text-blue-500 rounded-lg transition duration-300 hover:bg-blue-500 hover:text-white"
            >
              Send <FiSend className="ml-2" /> {/* Added Send icon here */}
            </button>
          </form>
        </div>

        {/* Image on the Right */}
        <div className="w-full md:w-1/2 md:mt-0 md:ml-8">
          <img
            src={contactus}
            alt="Contact Us"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
