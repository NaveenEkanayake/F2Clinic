import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../assets/beauty.avif";
import Navbar from "../AdminNav/Navbar";
import Footer from "../Footer";
import { FaSignInAlt } from "react-icons/fa"; // Import the icon
import { Link } from "react-router-dom";

function Adminlogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/adminauthentication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/Admin");
        }, 1000);
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  return (
    <>
      <Navbar />
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white bg-opacity-70 p-16 rounded-2xl w-full max-w-xl shadow-lg">
            <h1
              className="text-4xl font-bold text-center text-gray-800 mb-10"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Admin Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                {
                  id: "email",
                  type: "email",
                  label: "Email",
                  required: true,
                },
                {
                  id: "password",
                  type: "password",
                  label: "Password",
                  required: true,
                },
              ].map(({ id, type, label, required }) => (
                <div key={id} className="relative mb-8">
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={data[id] || ""}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full p-4 border-b border-gray-300 rounded-lg bg-transparent focus:outline-none focus:border-blue-500 ${
                      data[id] ? "bg-transparent" : ""
                    }`}
                  />
                  <label
                    htmlFor={id}
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-black font-semibold transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-black peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-blue-500 peer-focus:text-sm ${
                      data[id]
                        ? "text-blue-500 text-sm -translate-y-6"
                        : "text-black text-base"
                    }`}
                  >
                    {label}
                  </label>
                </div>
              ))}
              <div className="mb-8 text-center">
                <Link
                  to="/EmailAdmin1 "
                  className="text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className={`w-full py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center ${
                  loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    <FaSignInAlt className="mr-2" /> {/* Icon */}
                    Login
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Adminlogin;
