import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../AdminNav/Navbar";
import Image1 from "../assets/newimg.jpg"; // Make sure this path is correct

function Update() {
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
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const sendUpdateNotificationEmail = async (
    email,
    firstName,
    lastName,
    updatedFields
  ) => {
    try {
      setLoading(true);
      let updatedFieldsHTML = "";
      for (const field in updatedFields) {
        updatedFieldsHTML += `<li>${field}: ${updatedFields[field]}</li>`;
      }
      const emailResponse = await axios.post(
        "http://localhost:3000/api/sendEmail",
        {
          userEmail: email,
          subject: "Profile Update Notification",
          html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: #ffffff; }
              h1 { color: #333; }
              p { margin-bottom: 15px; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; }
            </style>
          </head>
          <body>
            <div class="container">
              <img src="https://firebasestorage.googleapis.com/v0/b/furrypetclinic.appspot.com/o/logo.png?alt=media&token=b5630494-77ec-486a-9374-8611de5f0756" alt="Furry Pet Clinic Logo" style="max-width: 40px;">
              <h1>Profile Update Notification</h1>
              <p>Dear ${firstName} ${lastName},</p>              
              <p>We would like to inform you that your profile has been updated successfully. The following fields have been updated:</p>
              <ul>${updatedFieldsHTML}</ul>
              <p>If you have any questions or concerns regarding this update, please don't hesitate to contact us.</p>
              <p>Thank you for your understanding.</p>
              <div class="footer">
                <p>Best regards,</p>
                <p>The Furry Pet Clinic Team</p>
              </div>
            </div>
          </body>
        </html>`,
        }
      );
      console.log(
        "Update notification email sent successfully:",
        emailResponse.data
      );
    } catch (error) {
      console.error("Error sending update notification email:", error);
      toast.error("Failed to send notification email");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/api/consultants/${id}`,
        formData
      );
      console.log("Data updated successfully:", response.data);
      setLoading(false);
      navigate("/Admin");
      toast.success("Consultant updated successfully");

      const updatedFields = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        specialty: formData.specialty,
        email: formData.email,
        telephoneNumber: formData.telephoneNumber,
        from: formData.from,
        to: formData.to,
      };

      sendUpdateNotificationEmail(
        formData.email,
        formData.firstName,
        formData.lastName,
        updatedFields
      );
    } catch (error) {
      console.error("Error updating data:", error);
      setLoading(false);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update consultant");
      }
    }
  };

  useEffect(() => {
    const fetchConsultantData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/consultants/${id}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        toast.error("Failed to fetch consultant details");
      }
    };

    fetchConsultantData();
  }, [id]);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Image1})`,
          filter: "brightness(0.70)",
        }}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="bg-white p-8 rounded-lg shadow-lg"
            style={{
              width: "872px",
              fontFamily: "'Times New Roman', serif",
              padding: "20px",
            }}
          >
            {step === 1 && (
              <>
                <h1 className="text-2xl font-semibold mb-4 text-center">
                  Update Consultant
                </h1>
                <form onSubmit={handleSubmit(nextStep)}>
                  <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700">
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      {...register("firstName")}
                      placeholder="Enter First Name"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={data.firstName}
                      onChange={(e) =>
                        setData({ ...data, firstName: e.target.value })
                      }
                    />
                    {errors.firstName && (
                      <span className="text-red-500">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      {...register("lastName")}
                      placeholder="Enter Last Name"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={data.lastName}
                      onChange={(e) =>
                        setData({ ...data, lastName: e.target.value })
                      }
                    />
                    {errors.lastName && (
                      <span className="text-red-500">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="specialty" className="block text-gray-700">
                      Specialty:
                    </label>
                    <select
                      id="specialty"
                      name="specialty"
                      {...register("specialty", {
                        required: "Specialty is required",
                      })}
                      className="w-full p-3 border border-gray-300 rounded"
                      value={data.specialty}
                      onChange={(e) =>
                        setData({ ...data, specialty: e.target.value })
                      }
                    >
                      <option value="">Select specialty</option>
                      <option value="checkups">Checkups</option>
                      <option value="vaccination">Vaccination</option>
                      <option value="dental">Dental</option>
                      <option value="surgery">Surgery</option>
                    </select>
                    {errors.specialty && (
                      <span className="text-red-500">
                        {errors.specialty.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 w-full"
                  >
                    Next
                  </button>
                </form>
              </>
            )}
            {step === 2 && (
              <>
                <h1 className="text-2xl font-semibold mb-4 text-center">
                  Contact Details
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Enter Email"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="telephoneNumber"
                      className="block text-gray-700"
                    >
                      Telephone Number:
                    </label>
                    <input
                      type="text"
                      id="telephoneNumber"
                      name="telephoneNumber"
                      {...register("telephoneNumber", {
                        required: "Telephone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Invalid telephone number",
                        },
                      })}
                      placeholder="Enter Telephone Number"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={data.telephoneNumber}
                      onChange={(e) =>
                        setData({ ...data, telephoneNumber: e.target.value })
                      }
                    />
                    {errors.telephoneNumber && (
                      <span className="text-red-500">
                        {errors.telephoneNumber.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="availability"
                      className="block text-gray-700"
                    >
                      Availability:
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        id="from"
                        name="from"
                        {...register("from", {
                          required: "Start time is required",
                        })}
                        placeholder="From"
                        className="w-1/2 p-3 border border-gray-300 rounded"
                        value={data.from}
                        onChange={(e) =>
                          setData({ ...data, from: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        id="to"
                        name="to"
                        {...register("to", {
                          required: "End time is required",
                        })}
                        placeholder="To"
                        className="w-1/2 p-3 border border-gray-300 rounded"
                        value={data.to}
                        onChange={(e) =>
                          setData({ ...data, to: e.target.value })
                        }
                      />
                    </div>
                    {errors.from && (
                      <span className="text-red-500">
                        {errors.from.message}
                      </span>
                    )}
                    {errors.to && (
                      <span className="text-red-500">{errors.to.message}</span>
                    )}
                  </div>
                  <div className="flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 w-full"
                    >
                      {loading ? "Updating..." : "Update Consultant"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Update;
