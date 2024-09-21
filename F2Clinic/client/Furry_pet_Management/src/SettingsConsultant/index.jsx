import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { toast } from "react-toastify";
import Footer from "../Footer/index";
import ConsultantNav from "../ConsultantNav";

const ConsultantSettings = () => {
  const [profileFormData, setProfileFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    imageFile: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleProfileFormChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfileFormData((prevData) => ({
        ...prevData,
        imageFile: selectedFile,
      }));
    }
  };

  const handleProfileFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = "";
      if (profileFormData.imageFile) {
        imageUrl = await uploadImage(profileFormData.imageFile);
      }

      const formDataWithImage = {
        ...profileFormData,
        imageUrl,
      };

      // Submit formDataWithImage to your backend
      console.log("Profile updated successfully:", formDataWithImage);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (imageFile) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(imageFile.name);
    try {
      const snapshot = await fileRef.put(imageFile);
      const url = await snapshot.ref.getDownloadURL();
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  return (
    <>
      <ConsultantNav />
      <div className="w-full mt-10 p-10 rounded-full flex">
        <form
          onSubmit={handleProfileFormSubmit}
          className="bg-white rounded-lg shadow-lg border border-gray-300 p-10 mr-6 flex-1"
          style={{ height: "750px", width: "1000px" }}
        >
          <div
            className="text-center mb-9 font-serif font-semibold"
            style={{ fontSize: "30px" }}
          >
            <h1>My Profile</h1>
            <div
              className="underline"
              style={{
                borderBottom: "2px solid grey",
                width: "500px",
                margin: "auto",
                marginTop: "20px",
              }}
            ></div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div
              className="new-consultant-profile-picture mb-3 cursor-pointer"
              onClick={() => document.getElementById("profileImage").click()}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {profileFormData.imageFile ? (
                <img
                  src={URL.createObjectURL(profileFormData.imageFile)}
                  alt="Profile Preview"
                  className="rounded-full"
                  width="100"
                  height="100"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <FaUserCircle
                  size="200px"
                  color="black"
                  className="mb-5"
                  style={{ width: "200px", height: "200px" }}
                />
              )}
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            <a
              href="#"
              onClick={() => document.getElementById("profileImage").click()}
              className="text-blue-500 underline"
              style={{ marginTop: "10px" }}
            >
              Add a profile pic
            </a>
          </div>
          <div className="new-consultant-profile-form-group mb-4">
            <label htmlFor="username" className="block mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your Username"
              className="w-full p-2 border border-gray-300 rounded"
              value={profileFormData.username}
              onChange={handleProfileFormChange}
            />
          </div>

          <div className="new-consultant-profile-form-group mb-4">
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full p-2 border border-gray-300 rounded"
              value={profileFormData.email}
              onChange={handleProfileFormChange}
            />
          </div>

          <div className="new-consultant-profile-form-group mb-4">
            <label htmlFor="phone" className="block mb-2">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded"
              value={profileFormData.phone}
              onChange={handleProfileFormChange}
            />
          </div>

          <div className="new-consultant-profile-form-actions flex justify-center mt-10 w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-2xl hover:bg-slate-400 w-full max-w-xs"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ConsultantSettings;
