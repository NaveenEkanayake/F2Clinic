import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebararrow from "../../assets/images/Sidebararrow.png";
import logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/avatar.png";
import Logout from "../../assets/images/Logout.webp";
import PetRecordsIcon from "../../assets/images/Records.jpg";
import HomeIcon from "../../assets/images/Home.png";
import app from "../Firebase/config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { verifyconsultant } from "../../Api/config";

const ConsultantSidebar = ({ open, setOpen }) => {
  const [inputs, setInputs] = useState({});
  const [img, setImg] = useState(null);
  const [ConsultantUrl, setConsultantUrl] = useState(
    localStorage.getItem("ConsultantUrl") || Avatar
  );
  const fileInputRef = useRef(null);
  const [consultantId, SetConsultantId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await verifyconsultant();
        if (response && response.consultant) {
          SetConsultantId(response.consultant._id);
        } else {
          console.error("consultant data not found in response:", response);
        }
      } catch (error) {
        console.error("Error verifying admin:", error);
      }
    };

    verifyconsultant();
  }, []);
  useEffect(() => {
    if (img) {
      uploadFile(img);
    }
  }, [img]);

  useEffect(() => {
    if (img) {
      uploadFile(img);
    }
  }, [img]);

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `consultantprofile/${file.name}`);
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
          console.log("File available at", downloadURL);
          setConsultantUrl(downloadURL);
          localStorage.setItem("ConsultantUrl", downloadURL);
          setInputs((prev) => ({ ...prev, ConsultantUrl: downloadURL }));
          handleSubmit();
        });
      }
    );
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  useEffect(() => {
    const storedConsultantUrl = localStorage.getItem("ConsultantUrl");
    if (storedConsultantUrl) {
      setConsultantUrl(storedConsultantUrl);
    } else {
      fetchImageUrl();
    }
  }, []);

  const fetchImageUrl = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getConsultantIMG"
      );
      const fetchedConsultantUrl = response.data.ConsultantUrl || Avatar;
      if (fetchedConsultantUrl && fetchedConsultantUrl !== "null") {
        setConsultantUrl(fetchedImgUrl);
        localStorage.setItem("ConsultantUrl", fetchedConsultantUrl);
      } else {
        // If not valid, set to the default avatar
        setConsultantUrl(Avatar);
        localStorage.setItem("imgUrl", Avatar);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setConsultantUrl(Avatar);
      localStorage.setItem("ConsultantUrl", Avatar);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/addConsultantimg",
        {
          ConsultantUrl: ConsultantUrl,
        }
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error.response) {
        console.error("Error message:", error.response.data);
      }
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
      <div className="flex flex-col items-center mt-8">
        <img
          src={ConsultantUrl}
          className={`rounded-full cursor-pointer ${
            open ? "w-24 h-24" : "w-10 h-10"
          }`}
          onClick={() => setOpen(!open)}
          alt="Avatar"
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
            >
              Add a Profile Pic
            </button>
          </>
        )}
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
      </ul>
      <Link
        to="/logout"
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

export default ConsultantSidebar;
