import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebararrow from "../../assets/images/Sidebararrow.png";
import logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/avatar.png";
import Logout from "../../assets/images/Logout.webp";
import PetRecordsIcon from "../../assets/images/Records.jpg";
import Notification from "../../assets/images/Notification.png";
import HomeIcon from "../../assets/images/Home.png";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  verifyconsultant,
  uploadConsultantImage,
  getConsultantIMG,
  getAllNotifications,
  LogoutConsultant,
} from "../../Api/config";
import { ToastContainer } from "react-toastify";
import app from "../Firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConsultantSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [ConsultantData, setConsultantData] = useState(null);
  const [ConsultantUrl, setConsultantUrl] = useState(
    localStorage.getItem("ConsultantUrl") || Avatar
  );

  useEffect(() => {
    const fetchConsultantData = async () => {
      try {
        const response = await verifyconsultant();
        console.log("Consultant Data response:", response);
        if (response && response.consultant) {
          setConsultantData(response.consultant);
        }
      } catch (error) {
        console.error("Error verifying consultant:", error);
      }
    };

    fetchConsultantData();
  }, []);

  const fetchNotifications = async () => {
    const results = await getAllNotifications();
    if (results?.notifications) {
      setNotifications(results.notifications);
      setNotificationsCount(results.notifications.length);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchConsultantUrl = async () => {
    try {
      const response = await getConsultantIMG();
      if (response && response.ConsultantUrl) {
        setConsultantUrl(response.ConsultantUrl);
        localStorage.setItem("ConsultantUrl", response.ConsultantUrl);
      } else {
        console.error("No ConsultantUrl found in response.");
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };

  useEffect(() => {
    fetchConsultantUrl();
  }, []);

  const handleLogout = async () => {
    const result = await LogoutConsultant();
    if (result && result.message) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/consultantlogin");
    }
  };

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `Consultantprofile/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error during upload:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setConsultantUrl(downloadURL);
          localStorage.setItem("ConsultantUrl", downloadURL);
          handleSubmit(downloadURL);
          console.log("Image uploaded successfully to Firebase:", downloadURL);
        });
      }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleSubmit = async (downloadURL) => {
    try {
      const response = await uploadConsultantImage({
        ConsultantUrl: downloadURL,
      });
      if (response && response.createdData) {
        setConsultantUrl(downloadURL);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div
      className={`${
        open ? "w-96" : "w-24"
      } flex flex-col h-screen p-5 pt-8 bg-[#081A51] relative transition-all duration-300`}
    >
      <img
        src={Sidebararrow}
        className={`absolute cursor-pointer right-[-17px] top-9 border-4 border-[#081A51] rounded-full ${
          !open ? "rotate-180" : "rotate-0"
        }`}
        onClick={() => setOpen((prev) => !prev)}
        alt="Toggle Sidebar"
      />
      <Link to="/consultantdashboard" className="flex gap-4 items-center">
        <img
          src={logo}
          className={`duration-500 ${open ? "h-14 w-14" : "h-10 w-10"} ${
            !open ? "rotate-[360deg]" : "rotate-0"
          } cursor-pointer`}
          alt="Logo"
        />
        {open && (
          <span className="origin-center text-white text-[24px] font-normal transition-transform duration-300">
            Furry Pet Clinic
          </span>
        )}
      </Link>
      <div className="flex flex-col items-center mt-8 ">
        <div
          className="relative"
          onMouseEnter={() => setDialogVisible(true)}
          onMouseLeave={() => setDialogVisible(false)}
        >
          <img
            src={ConsultantUrl}
            alt="Profile Avatar"
            className={`rounded-full cursor-pointer ml-3 ${
              open ? "w-24 h-24" : "w-10 h-10"
            }`}
            onClick={() => setOpen(!open)}
          />
          {open && (
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="text-white hover:text-blue-500 mt-2 cursor-pointer"
                onClick={() => fileInputRef.current.click()}
                aria-label="Upload a profile picture"
              >
                Add a Profile Pic
              </button>
            </>
          )}
          {dialogVisible && ConsultantData && (
            <div className="absolute top-0 left-[120px] w-32  mt-2 mr-2 p-2 bg-white border rounded shadow-lg z-10 cursor-pointer">
              <h2 className="text-xs font-semibold">
                Welcome, {ConsultantData.fullname || "Guest"}
              </h2>
              <p className="text-[8px] mt-1">
                {ConsultantData.email || "No email available"}
              </p>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
      <ul className="pt-8 space-y-2">
        <Link
          to="/consultantdashboard"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img
            src={HomeIcon}
            alt="Home Icon"
            className="h-6 w-6 mr-2 invert brightness-110"
          />
          {open && <span>Home</span>}
        </Link>

        <Link
          to="/ConsultantpetRecord"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img
            src={PetRecordsIcon}
            alt="Pet Records"
            className="h-6 w-6 invert brightness-110"
          />
          {open && <span>Pet Records</span>}
        </Link>

        <Link
          to="/ConsultantNotifiaction"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img src={Notification} className="h-6 w-6 brightness-110" />
          {notificationsCount > 0 && (
            <span className="absolute mb-[20px] right-6 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {notificationsCount > 99 ? "99+" : notificationsCount}
            </span>
          )}
          {open && <span>Notification</span>}
        </Link>
      </ul>

      <Link
        onClick={handleLogout}
        className={`flex items-center py-4 px-4 ${
          open ? "bg-slate-700 hover:bg-blue-600" : "bg-transparent"
        } text-white font-normal rounded-md cursor-pointer gap-1 mt-auto ${
          !open ? "justify-center" : ""
        }`}
      >
        <img
          src={Logout}
          alt="Logout Icon"
          className="h-6 w-6 mr-2 invert brightness-110"
        />
        {open && <span>Logout</span>}
      </Link>

      <div className="mt-auto text-white">
        {open && (
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Furry Pet Clinic. All Rights
            Reserved.
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConsultantSidebar;
