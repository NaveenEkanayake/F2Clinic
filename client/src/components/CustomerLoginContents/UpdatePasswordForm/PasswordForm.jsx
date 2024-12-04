import { IoLockClosedOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import LoginImage from "../../../assets/images/Customerlogin.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import UpdateButton from "../UpdatePassword/UpdateButton";
import { ResetCustomerPassword } from "@/Api/config";

const PasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    ResetCustomerPassword(id, token, { password })
      .then((result) => {
        console.log("Password reset successfully", result);
        toast.success("Password reset successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/customerlogin");
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to reset password:", err);
        toast.error("Failed to reset password. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
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
            Enter your New password to reset
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full h-auto flex flex-col items-center gap-7 px-10"
        >
          <div className="w-full relative">
            <label className="text-white font-semibold">New Password</label>
            <div className="flex items-center mt-2">
              <IoLockClosedOutline className="text-white mr-3" />
              <input
                type="password"
                name="password"
                value={password}
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
                placeholder="Enter your New password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <UpdateButton loading={loading}>Update Password</UpdateButton>
        </form>
        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default PasswordForm;
