import React from "react";
import { FiSend } from "react-icons/fi";
import image1 from "../assets/password.jpg";
import NavbarLogin from "../LoginNav";
import { useNavigate } from "react-router-dom";

const EmailConsultant = () => {
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    navigate("/Consultant2");
  };

  return (
    <>
      <NavbarLogin />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100"
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-4xl flex bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Form Section */}
          <div
            className="w-full flex flex-col justify-center"
            style={{
              padding: "50px",
              backgroundColor: "rgba(249, 249, 249, 0.9)",
              borderRadius: "0 0.5rem 0.5rem 0",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              Send your password to reset the password !!!
            </h2>
            <form onSubmit={handleSubmit}>
              {" "}
              {/* Add onSubmit handler */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="border border-blue-500 text-blue-500 font-bold py-3 px-11 rounded flex items-center justify-center focus:outline-none focus:shadow-outline hover:bg-blue-500 hover:text-white transition-colors duration-300"
              >
                <FiSend className="mr-2" />{" "}
                {/* Add the send icon with margin */}
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailConsultant;
