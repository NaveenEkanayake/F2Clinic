import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebararrow from "../../assets/images/Sidebararrow.png";
import logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/avatar.png";
import ConsultantIcon from "../../assets/images/consultant.png";
import Setting from "../../assets/images/settings.jpg";
import NotificationIcon from "../../assets/images/Notification.png";
import HomeIcon from "../../assets/images/Home.png";
import DarkModeButton from "./DarkModeButton/DarkModeButton";
import InventoryIcon from "../../assets/images/Inventory.png";
import app from "../Firebase/config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  verifyadmin,
  uploadAdminImage,
  getAdminIMG,
  Logoutadmin,
} from "../../Api/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Logout from "../../assets/images/logout.webp";
import { toast } from "react-toastify";

const AdminSidebar = ({ open, setOpen }) => {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isPetRecordsOpen, setIsPetRecordsOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [notificationsCount] = useState(1);
  const [adminData, setAdminData] = useState(null);
  const [AdminUrl, setAdminUrl] = useState(
    localStorage.getItem("AdminUrl") || Avatar
  );
  const [img, setImg] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const [adminId, setAdminId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const toggleDropdown = (setter) => () => setter((prev) => !prev);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await verifyadmin();
        if (response && response.admin) {
          setAdminData(response.admin);
          setAdminId(response.admin._id);
        }
      } catch (error) {
        console.error("Error verifying admin:", error);
      }
    };

    verifyAdmin();
    fetchImageUrl();
  }, []);

  useEffect(() => {
    if (img) {
      uploadFile(img);
    }
  }, [img]);

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `adminprofile/${file.name}`);
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
          setAdminUrl(downloadURL);
          localStorage.setItem("AdminUrl", downloadURL);
          handleSubmit(downloadURL);
        });
      }
    );
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Logoutadmin();
    if (result && result.message) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/adminlogin");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const fetchImageUrl = async () => {
    try {
      const response = await getAdminIMG();
      console.log("Fetched image URL:", response);

      if (response && response.AdminUrl) {
        setImageUrl(response.AdminUrl);
      } else {
        console.warn("No AdminUrl found in response:", response);
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };

  const handleSubmit = async (downloadURL) => {
    try {
      const response = await uploadAdminImage({ AdminUrl: downloadURL });
      console.log("Image upload response:", response);
      if (response && response.createdData) {
        console.log("Uploaded image data:", response.createdData);
        fetchImageUrl();
      } else {
        console.warn("Unexpected response structure:", response);
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
      <Link to="/admindashboard" className="flex gap-4 items-center">
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
            src={AdminUrl}
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
                Welcome, {adminData.fullname}
              </h2>
              <p className="text-[8px] mt-1">{adminData.email}</p>
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
      <ul className="pt-8 space-y-2">
        <Link
          to="/admindashboard"
          className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white font-normal rounded-md cursor-pointer gap-1 ${
            !open ? "justify-center" : ""
          }`}
        >
          <img src={HomeIcon} className="h-6 w-6 mr-2 invert brightness-110" />
          {open && <span>Home</span>}
        </Link>
        <div className="text-white">
          <div
            onClick={toggleDropdown(setIsAppointmentOpen)}
            className={`flex items-center py-4 px-4 hover:bg-blue-500 font-normal rounded-md cursor-pointer ${
              !open ? "justify-center" : ""
            }`}
          >
            <img
              src={ConsultantIcon}
              className={`w-5 h-5 mr-2 invert brightness-110`}
            />
            {open && <span>Consultant</span>}
          </div>
          {isAppointmentOpen && open && (
            <ul className="ml-6 space-y-2">
              <Link
                to="/addconsultant"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                Add Consultant
              </Link>
              <Link
                to="/viewconsultant"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                View Consultant
              </Link>
            </ul>
          )}
        </div>
        <div className="text-white">
          <div
            onClick={toggleDropdown(setIsInventoryOpen)}
            className={`flex items-center py-4 px-4 hover:bg-blue-500 font-normal rounded-md cursor-pointer ${
              !open ? "justify-center" : ""
            }`}
          >
            <img
              src={InventoryIcon}
              className="w-5 h-5 mr-2 invert brightness-110"
            />
            {open && <span>Inventory</span>}
          </div>
          {isInventoryOpen && open && (
            <ul className="ml-6 space-y-2">
              <Link
                to="/Inventory"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                Add Inventory
              </Link>
              <Link
                to="/ViewInventory"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                View Inventory
              </Link>
            </ul>
          )}
        </div>
        <div className={`text-white`}>
          <div
            onClick={toggleDropdown(setIsMessageOpen)}
            className={`flex items-center py-4 px-4 hover:bg-blue-500 font-normal rounded-md cursor-pointer ${
              !open ? "justify-center" : ""
            }`}
          >
            <img
              src={NotificationIcon}
              className={`w-5 h-5 mr-2  brightness-110`}
              alt="Message Icon"
            />
            {open && <span>Message</span>}
          </div>
          {isMessageOpen && open && (
            <ul className="ml-6 space-y-2">
              <Link
                to="/createmessage"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                Create Message
              </Link>
              <Link
                to="/adminviewnotification"
                className="block py-4 px-4 hover:bg-blue-500 rounded-lg"
              >
                View Messages
              </Link>
            </ul>
          )}
        </div>
        <div className="relative">
          <Link
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen((prev) => !prev);
            }}
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
    </div>
  );
};

export default AdminSidebar;
