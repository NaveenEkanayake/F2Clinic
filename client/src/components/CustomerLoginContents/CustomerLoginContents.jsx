import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import LoginImage from "../../assets/images/Customerlogin.jpg";
import LoginButton from "../CustomerLoginButton/LoginButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Logincustomer } from "@/Api/config";

const CustomerLoginContents = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    Logincustomer({ email, password })
      .then((result) => {
        console.log("Login successfully", result);
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      })
      .catch((err) => {
        console.error("Login failed:", err);
        toast.error("Login failed. Invalid email or password.", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/customerlogin");
        }, 3000);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage: `url(${LoginImage})`,
        backgroundRepeat: "no-repeat",
        filter: "brightness(0.9)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, translateY: "100%" }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[40%] h-auto py-20 rounded-xl"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          boxShadow: "8px 8px 40px rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          border: "2px solid rgba(255, 255, 255, 0.61)",
          zIndex: 999,
        }}
      >
        <div className="w-full h-auto text-center">
          <p className="text-white text-2xl font-semibold mb-5">
            Welcome Back to Furry Pet Clinic!!!
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full h-auto flex flex-col items-center gap-7 px-10"
        >
          <div className="w-full relative">
            <label className="text-white font-semibold ">Email</label>
            <div className="flex items-center mt-2">
              <IoMailOutline className="text-white mr-3" />
              <input
                type="email"
                name="email"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full relative">
            <label className="text-white font-semibold">Password</label>
            <div className="flex items-center mt-2">
              <IoLockClosedOutline className="text-white mr-3" />
              <input
                type="password"
                name="password"
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <LoginButton loading={loading}>Login</LoginButton>
        </form>
        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default CustomerLoginContents;
