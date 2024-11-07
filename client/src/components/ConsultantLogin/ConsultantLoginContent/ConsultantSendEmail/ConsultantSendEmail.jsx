import { IoMailOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import SendButton from "./SendButton/SendButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { SendConsultantForgotPassword } from "@/Api/config";

const ConsultantSendEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    SendConsultantForgotPassword({ email })
      .then((result) => {
        console.log("Password reset email sent successfully", result);
        toast.success("Password reset email sent successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.error("Failed to send password reset email:", err);
        toast.error("Failed to send password reset email. Please try again.", {
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
      className="w-full min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(to right, rgba(0, 123, 255, 0.8), rgba(75, 0, 130, 0.8))",
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
            Enter Your Email to reset Password
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
          <SendButton loading={loading}>Send</SendButton>
        </form>
        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default ConsultantSendEmail;
