import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/backuser.avif";
import UserNav from "../UserNav";
import Footer from "../Footer";

const Makeanappointment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Appointment data submitted:", data);

    // Simulate a delay for booking
    setTimeout(() => {
      // Save appointment data to local storage or state
      localStorage.setItem("appointment", JSON.stringify(data));
      toast.success("Appointment booked successfully");
      navigate("/Payment");
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <UserNav />
      <div
        className="appointment-container"
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="form-container border mt-10 border-gray-400 bg-opacity-90 rounded-md bg-white"
          style={{
            width: "872px",
            padding: "20px",
          }}
        >
          <h1
            className="text-black text-center"
            style={{
              fontFamily: "Times New Roman, sans-serif",
              fontSize: "30px",
            }}
          >
            Make an Appointment
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="text-black">
            {/* Doctor Selection */}
            <div className="appointment-form-group flex flex-col mb-4">
              <label
                htmlFor="doctor"
                className="text-black"
                style={{ fontFamily: "Times New Roman, sans-serif" }}
              >
                Select Doctor:
              </label>
              <select
                id="doctor"
                name="doctor"
                {...register("doctor", { required: "Doctor is required" })}
                className="p-4 border border-gray-400 rounded-md"
                style={{ color: "black" }}
              >
                <option value="">--Select Doctor--</option>
                <option value="John Doe">John Doe</option>
                <option value="Robert Smith">Robert Smith</option>
                <option value="Jane Smith">Jane Smith</option>
              </select>
              {errors.doctor && (
                <span className="error text-red-500">
                  {errors.doctor.message}
                </span>
              )}
            </div>

            {/* Date Input */}
            <div className="appointment-form-group flex flex-col mb-4">
              <label
                htmlFor="date"
                className="text-black"
                style={{ fontFamily: "Times New Roman, sans-serif" }}
              >
                Select Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                {...register("date", { required: "Date is required" })}
                className="p-4 border border-gray-400 rounded-md"
                style={{ color: "black" }}
              />
              {errors.date && (
                <span className="error text-red-500">
                  {errors.date.message}
                </span>
              )}
            </div>

            {/* Time Slot Input */}
            <div className="appointment-form-group flex flex-col mb-4">
              <label
                htmlFor="time"
                className="text-black"
                style={{ fontFamily: "Times New Roman, sans-serif" }}
              >
                Select Time Slot:
              </label>
              <input
                type="time"
                id="time"
                name="time"
                {...register("time", { required: "Time slot is required" })}
                className="p-4 border border-gray-400 rounded-md"
                style={{ color: "black" }}
              />
              {errors.time && (
                <span className="error text-red-500">
                  {errors.time.message}
                </span>
              )}
            </div>

            {/* Special Concerns Input */}
            <div className="appointment-form-group flex flex-col mb-4">
              <label
                htmlFor="concerns"
                className="text-black"
                style={{ fontFamily: "Times New Roman, sans-serif" }}
              >
                Special Concerns:
              </label>
              <textarea
                id="concerns"
                name="concerns"
                {...register("concerns")}
                placeholder="Enter any special concerns"
                className="p-4 border border-gray-400 rounded-md"
                style={{ color: "black" }}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="appointment-submit-button mx-auto block bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
              style={{ fontFamily: "Times New Roman, sans-serif" }}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default Makeanappointment;
