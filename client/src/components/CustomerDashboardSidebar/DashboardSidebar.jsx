import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Sidebararrow from "../../assets/images/Sidebararrow.png";
import logo from "../../assets/images/logo.png";
import AppointmentIcon from "../../assets/images/Records.jpg";
import PetRecordsIcon from "../../assets/images/Records.jpg";
import Setting from "../../assets/images/settings.jpg";
import Logout from "../../assets/images/Logout.webp";
import Notification from "../../assets/images/Notification.png";
import HomeIcon from "../../assets/images/Home.png";
import DarkModeButton from "./DarkmodeButton/DarkModeButton";
import ContactUs from "../../assets/images/ContactUs.png";
import app from "../Firebase/config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  verifyCustomer,
  uploadCustomerImage,
  getCustomerIMG,
  getAllNotifications,
  ISReadAllNotifications,
  LogoutCustomer,
} from "../../Api/config";
import Avatar from "../../assets/images/avatar.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const DashboardSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isPetRecordsOpen, setIsPetRecordsOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [img, setImg] = useState(null);
  const [inputs, setInputs] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [UserData, setUserData] = useState(null);
  const [IMGurl, setIMGurl] = useState(
    localStorage.getItem("IMGurl") || Avatar
  );
  const fileInputRef = useRef(null);
  const toggleAppointmentDropdown = () =>
    setIsAppointmentOpen(!isAppointmentOpen);
  const togglePetRecordsDropdown = () => setIsPetRecordsOpen(!isPetRecordsOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await verifyCustomer();
        if (response && response.user) {
          setUserData(response.user);
        }
      } catch (error) {
        console.error("Error verifying customer:", error);
      }
    };
    fetchUserData();
    fetchImageUrl();
  }, []);

  const fetchImageUrl = async () => {
    try {
      const response = await getCustomerIMG();
      if (response && response.IMGurl) {
        setIMGurl(response.IMGurl);
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `Customerprofile/${file.name}`);
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
          setIMGurl(downloadURL);
          localStorage.setItem("IMGurl", downloadURL);
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
      const response = await uploadCustomerImage({ IMGurl: downloadURL });
      if (response && response.createdData) {
        fetchImageUrl();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
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

  const handleLogout = async () => {
    const result = await LogoutCustomer();
    if (result && result.message) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/customerlogin");
    }
  };
  const handleReadAll = async () => {
    try {
      await ISReadAllNotifications();
      setNotifications((prevNotifications) => {
        const updatedNotifications = prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }));
        const allRead = updatedNotifications.every(
          (notification) => notification.isRead
        );
        if (allRead) {
          setNotificationsCount(0);
        }

        return updatedNotifications;
      });
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <div
      className={`${
        open ? "w-96" : "w-24"
      } flex flex-col  p-5 pt-8 bg-[#081A51] relative min-h-screen transition-all duration-300`}
    >
      <img
        src={Sidebararrow}
        className={`absolute cursor-pointer right-[-17px] top-9 border-4 border-[#081A51] rounded-full ${
          !open ? "rotate-180" : "rotate-0"
        }`}
        onClick={() => setOpen(!open)}
        alt="Toggle Sidebar"
      />
      <Link to="/customerdashboard" className="flex gap-4 items-center">
        <img
          src={logo}
          className={`duration-500 ${open ? "h-14 w-14" : "h-10 w-10"} ${
            !open ? "rotate-[360deg]" : "rotate-0"
          } cursor-pointer`}
          alt="Logo"
        />
        {open && (
          <Link
            to="/customerdashboard"
            className="origin-center text-white text-[24px] font-normal transition-transform duration-300"
          >
            Furry Pet Clinic
          </Link>
        )}
      </Link>
      <div className="flex flex-col items-center mt-8 ">
        <div
          className="relative"
          onMouseEnter={() => setDialogVisible(true)}
          onMouseLeave={() => setDialogVisible(false)}
        >
          <img
            src={IMGurl}
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
          {dialogVisible && (
            <div className="absolute top-0 left-[120px] w-32  mt-2 mr-2 p-2 bg-white border rounded shadow-lg z-10 cursor-pointer">
              <h2 className="text-xs font-semibold">
                Welcome, {UserData.fullname}
              </h2>
              <p className="text-[8px] mt-1">{UserData.email}</p>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
      <ul className="pt-8 space-y-2">
        <Link
          to="/customerdashboard"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img src={HomeIcon} className="h-6 w-6 mr-2 invert brightness-110" />
          {open && <span>Home</span>}
        </Link>
        <div className="text-white">
          <div
            onClick={toggleAppointmentDropdown}
            className={`flex items-center py-4 px-4 hover:bg-blue-500 font-normal rounded-md cursor-pointer ${
              !open ? "justify-center" : ""
            }`}
          >
            <img
              src={AppointmentIcon}
              className={`w-5 h-5 mr-2 invert brightness-110 ${
                open ? "w-5 h-5" : "w-10 h-10"
              }`}
            />
            {open && <span>Appointment</span>}
          </div>
          {isAppointmentOpen && open && (
            <ul className="ml-6 space-y-2">
              <Link
                to="/appointment"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                Make Appointment
              </Link>
              <Link
                to="/viewappointment"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                View Appointment
              </Link>
            </ul>
          )}
        </div>
        <div className="text-white">
          <div
            onClick={togglePetRecordsDropdown}
            className={`flex items-center py-4 px-4 hover:bg-blue-500 font-normal rounded-md cursor-pointer ${
              !open ? "justify-center" : ""
            }`}
          >
            <img
              src={PetRecordsIcon}
              className="w-5 h-5 mr-2 invert brightness-110"
            />
            {open && <span>Pet Records</span>}
          </div>
          {isPetRecordsOpen && open && (
            <ul className="ml-6 space-y-2">
              <Link
                to="/petRecord"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                Add Pet Records
              </Link>
              <Link
                to="/viewpetRecord"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                View Pet Records
              </Link>
            </ul>
          )}
        </div>
        <Link
          to="/contactus"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img src={ContactUs} className="h-6 w-6 mr-2 invert brightness-110" />
          {open && <span>Contactus</span>}
        </Link>
        <Link
          to="/Notification"
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
        <div className="relative">
          <Link
            onClick={toggleDropdown}
            className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
              !open ? "justify-center" : ""
            }`}
          >
            <img src={Setting} className="h-6 w-6 mr-2 invert brightness-110" />
            {open && <span>Settings</span>}
          </Link>
          {dropdownOpen && (
            <div className="absolute right-[40px] mt-2 w-64 bg-white shadow-lg rounded-md p-2">
              <DarkModeButton />
            </div>
          )}
        </div>
      </ul>
      <Link
        onClick={handleLogout}
        className={`flex items-center py-4 px-4 ${
          open ? "bg-slate-700 hover:bg-blue-600" : "bg-transparent"
        } text-white font-normal rounded-md cursor-pointer gap-1  mt-[50px] ${
          !open ? "justify-center" : ""
        }`}
      >
        <img src={Logout} className="h-6 w-6 mr-2 invert brightness-110" />
        {open && <span>Logout</span>}
      </Link>
      <div className="mt-[30px] text-white">
        {open && (
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Furry Pet Clinic. All Rights
            Reserved.
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
