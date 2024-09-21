import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Addconsul.css";
import Navbar from "../AdminNav/Navbar";
import backgroundimage from "../assets/Image0.jpeg";

const AddConsultant = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    email: "",
    telephoneNumber: "",
    from: "",
    to: "",
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nextStep = (formData) => {
    const isEmpty = Object.values(formData).some((value) => !value);
    if (isEmpty) {
      toast.error("Please fill in all fields");
    } else {
      setData(formData);
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const requestData = JSON.stringify(formData);
      const response = await axios.post(
        "http://localhost:3000/api/consultants",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      await sendWelcomeEmail(formData);

      navigate("/Admin");
      setTimeout(() => {
        toast.success("Consultant added successfully to Pet Clinic!", {
          autoClose: 3000,
        });
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add consultant");
    }
  };

  const sendWelcomeEmail = async (formData) => {
    try {
      setLoading(true);

      const { email } = formData;
      await axios.post("http://localhost:3000/api/sendEmail", {
        userEmail: email,
        subject: "Welcome to Furry Pet Clinic!",
        html: `
        <html>
        <body>
          <h1>Welcome to Furry Pet Clinic, ${formData.firstName} ${formData.lastName}!</h1>
        </body>
        </html>`,
      });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send email");
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="h-screen flex justify-center items-center"
        style={{
          backgroundImage: `url(${backgroundimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-4xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
          {step === 1 && (
            <form onSubmit={handleSubmit(nextStep)} className="text-black">
              <h1 className="text-center text-2xl mb-4">Add Consultant</h1>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block mb-2"
                  style={{
                    fontFamily: "Times New Roman,san-serif",
                  }}
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  placeholder="Enter First Name"
                  className="w-full p-2 border border-gray-400 rounded-md"
                />
                {errors.firstName && (
                  <span className="text-red-600">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block mb-2"
                  style={{
                    fontFamily: "Times New Roman,san-serif",
                  }}
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Enter Last Name"
                  className="w-full p-2 border border-gray-400 rounded-md"
                />
                {errors.lastName && (
                  <span className="text-red-600">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="specialty"
                  className="block mb-2"
                  style={{
                    fontFamily: "Times New Roman,san-serif",
                  }}
                >
                  Specialty:
                </label>
                <select
                  id="specialty"
                  {...register("specialty", {
                    required: "Specialty is required",
                  })}
                  className="w-full p-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select Specialty</option>
                  <option value="checkups">Checkups</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="dental">Dental</option>
                  <option value="surgery">Surgery</option>
                </select>
                {errors.specialty && (
                  <span className="text-red-600">
                    {errors.specialty.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                style={{
                  fontFamily: "Times New Roman,san-serif",
                }}
              >
                Next
              </button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleSubmit(onSubmit)} className="text-black">
              <h1 className="text-center text-2xl mb-4">Contact Details</h1>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2"
                  style={{
                    fontFamily: "Times New Roman,san-serif",
                  }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="Enter Email"
                  className="w-full p-2 border border-gray-400 rounded-md"
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="telephone"
                  className="block mb-2"
                  style={{
                    fontFamily: "Times New Roman,san-serif",
                  }}
                >
                  Telephone Number:
                </label>
                <input
                  type="tel"
                  id="telephone"
                  {...register("telephoneNumber", {
                    required: "Telephone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Please enter a valid telephone number",
                    },
                  })}
                  placeholder="Enter Telephone Number"
                  className="w-full p-2 border border-gray-400 rounded-md"
                />
                {errors.telephoneNumber && (
                  <span className="text-red-600">
                    {errors.telephoneNumber.message}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="w-1/2 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  onClick={prevStep}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="w-1/2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddConsultant;
