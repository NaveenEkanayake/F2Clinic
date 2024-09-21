import React, { useState } from "react";
import Logo from "../assets/logo.png";
import Background from "../assets/background.jpg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarLogin from "../LoginNav/index";

function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await registerUser(data);
  };

  const registerUser = async (userData) => {
    const { username, email, password, confirmPassword } = userData;

    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/customers/register",
        {
          UserName: username,
          Email: email,
          Password: password,
          ConfirmPassword: confirmPassword,
        }
      );

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed: " + error.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [inputValues, setInputValues] = useState({
    Fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <>
      <NavbarLogin />
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white bg-opacity-70 p-16 rounded-2xl w-full max-w-xl shadow-lg">
            <h1
              className="font-bold text-gray-800 mb-8 text-center text-4xl"
              style={{
                fontFamily: "Times New Roman, serif",
              }}
            >
              New to our Pet Clinic!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {[
                {
                  id: "Fullname",
                  type: "text",
                  label: "Fullname",
                  required: true,
                },
                { id: "email", type: "email", label: "Email", required: true },
                {
                  id: "password",
                  type: "password",
                  label: "Password",
                  required: true,
                },
                {
                  id: "confirmPassword",
                  type: "password",
                  label: "Confirm Password",
                  required: true,
                },
              ].map(({ id, type, label, required }) => (
                <div key={id} className="relative mb-8">
                  <input
                    type={type}
                    id={id}
                    {...register(id, {
                      required: required ? `${label} is required` : false,
                      minLength: id === "password" && {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                      validate: id === "confirmPassword" && {
                        value: (value) =>
                          value === password || "Passwords do not match",
                      },
                    })}
                    placeholder=" "
                    value={inputValues[id] || ""}
                    onChange={handleChange}
                    className={`peer w-full p-4 border-b border-gray-300 rounded-lg bg-transparent focus:outline-none focus:border-blue-500 ${
                      inputValues[id] ? "bg-transparent" : ""
                    }`}
                  />
                  <label
                    htmlFor={id}
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-black font-semibold transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-black peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-blue-500 peer-focus:text-sm ${
                      inputValues[id]
                        ? "text-blue-500 text-sm -translate-y-6"
                        : "text-black text-base"
                    }`}
                  >
                    {label}
                  </label>
                  {errors[id] && (
                    <span className="text-red-500">{errors[id].message}</span>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
