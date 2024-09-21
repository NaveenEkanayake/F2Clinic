import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/backuser.avif";
import UserNav from "../UserNav/index";
import Footer from "../Footer";

function Dash() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    petName: "",
    age: "",
    weight: "",
    specialConcerns: "",
  });

  const petRecords = []; // Define petRecords here or fetch from API
  const handleDelete = (id) => {
    // Define delete function here
  };

  const handleProfileFormChange = (event) => {
    const { name, value } = event.target;
    setProfileFormData({
      ...profileFormData,
      [name]: value,
    });
  };

  const handlePetFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleProfileFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <UserNav />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div
          className="p-10 w-screen h-screen mx-auto pt-8 bg-cover"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "1400px",
            fontFamily: "Times New Roman,serif",
          }}
        >
          <h1 className="text-4xl text-black font-bold mb-4">Pet Records</h1>
          <div className="w-full flex justify-end">
            <Link to="/Addinfo">
              <button className="p-3 rounded-xl bg-green-600 font-bold hover:bg-green-500 text-white transition ease-in-out mb-3">
                Add Info
              </button>
            </Link>
          </div>
          <table className="w-full border-collapse border rounded-xl">
            <thead>
              <tr className="bg-gray-200 rounded-xl">
                <th className="px-4 py-2 border">Owner Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Pet name</th>
                <th className="px-4 py-2 border">Pet Image</th>
                <th className="px-4 py-2 border">Breed</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {petRecords.map((record, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-2 border">{record.petName}</td>
                  <td className="px-4 py-2 border">{record.ownerName}</td>
                  <td className="px-4 py-2 border">{record.petBreed}</td>
                  <td className="px-4 py-2 border">{record.petAge}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-red-500 hover:bg-red-600 border-none ml-3 text-white p-2 rounded-xl"
                      onClick={() => {
                        handleDelete(record._id);
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`/update/${record._id}`}>
                      <button className="bg-green-500 hover:bg-green-600 border-none ml-3 text-white p-2 rounded-xl">
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dash;
