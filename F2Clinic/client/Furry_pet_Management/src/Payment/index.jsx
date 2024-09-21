import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../assets/payment.jpeg"; // Replace with your background image path
import UserNav from "../UserNav";
import Footer from "../Footer";

const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Payment data submitted:", data);
    try {
      // Simulate API call or submission logic here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Payment processed successfully");
    } catch (error) {
      toast.error("Error processing payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserNav />
      <div
        className="payment-container"
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
            Payment Details
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="text-black">
            {/* Card Number Input */}
            <div className="payment-form-group flex flex-col mb-4">
              <label
                htmlFor="cardNumber"
                className="text-black"
                style={{ fontFamily: "Times New Roman, sans-serif" }}
              >
                Card Number:
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                {...register("cardNumber", { required: "Card number is required" })}
                className="p-4 border border-gray-400 rounded-md"
                style={{ color: "black" }}
              />
              {errors.cardNumber && (
                <span className="error text-red-500">
                  {errors.cardNumber.message}
                </span>
              )}
            </div>

            {/* Expiry Date Input */}
            <div className="payment-form-group flex flex-col mb-4">
              <label
                htmlFor="expiryDate"
                className="text-black"
                style={{ fontFamily: "Times New Roman, sans-serif" }}
              >
                Expiry Date:
              </label>
              <input
                type="month"
                id="expiryDate"
                name="expiryDate"
                {...register("expiryDate", { required: "Expiry date is required" })}
                className="p-4 border border-gray-400 rounded-md"
                style={{ color: "black" }}
              />
              {errors.expiryDate && (
                <span className="error text-red-500">
                  {errors.expiryDate.message}
                </span>
              )}
            </div>

            {/* CVV Input */}
            <div className="payment-form-group flex flex-col mb-4">
              <label
                htmlFor="cvv"
                className="text-black"
                style={{ fontFamily: "Times New Roman, sans-serif" }}
              >
                CVV:
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                {...register("cvv", { required: "CVV is required" })}
                className="p-4 border border-gray-400 rounded-md"
                style={{ color: "black" }}
              />
              {errors.cvv && (
                <span className="error text-red-500">
                  {errors.cvv.message}
                </span>
              )}
            </div>

            {/* Cardholder Name Input */}
            <div className="payment-form-group flex flex-col mb-4">
              <label
                htmlFor="cardholderName"
                className="text-black"
                style={{ fontFamily: "Times New Roman, sans-serif" }}
              >
                Cardholder Name:
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                {...register("cardholderName", { required: "Cardholder name is required" })}
                className="p-4 border border-gray-400 rounded-md"
                style={{ color: "black" }}
              />
              {errors.cardholderName && (
                <span className="error text-red-500">
                  {errors.cardholderName.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="payment-submit-button mx-auto block bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
              style={{ fontFamily: "Times New Roman, sans-serif" }}
              disabled={loading}
            >
              {loading ? "Processing..." : "Process Payment"}
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default Payment;
