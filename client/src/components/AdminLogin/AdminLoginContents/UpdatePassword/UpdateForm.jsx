import { IoLockClosedOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import UpdateButton from "../UpdatePassword/UpdatePasswordButton/UpdateButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ResetAdminPassword } from "@/Api/config";
import { useNavigate } from "react-router-dom";

const AdminResetForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    ResetAdminPassword(id, token, { password })
      .then((result) => {
        console.log("Password reset successfully", result);
        toast.success("Password reset successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/adminlogin");
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
            Enter Your New Password to Reset the Old!!!
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
                placeholder="Enter your new password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <UpdateButton loading={loading}>Update</UpdateButton>
        </form>
        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default AdminResetForm;
