import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/backuser.avif";
import UserNav from "../UserNav/index";
import Footer from "../Footer";

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const handleDelete = (id) => {
    console.log("Deleted appointment with ID:", id);
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
          <h1 className="text-4xl text-black font-bold mb-4">
            Appointment Records
          </h1>
          <div className="w-full flex justify-end"></div>
          <table className="w-full border-collapse border rounded-xl">
            <thead>
              <tr className="bg-gray-200 rounded-xl">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Doctor Name</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Time</th>
                <th className="px-4 py-2 border">Special Concerns</th>
                <th className="px-4 py-2 border">Payment Status</th>
                <th className="px-4 py-2 border"> Appointment Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr
                  key={appointment.id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-2 border">{appointment.id}</td>
                  <td className="px-4 py-2 border">{appointment.doctor}</td>
                  <td className="px-4 py-2 border">{appointment.date}</td>
                  <td className="px-4 py-2 border">{appointment.time}</td>
                  <td className="px-4 py-2 border">
                    {appointment.specialConcerns}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-red-500 hover:bg-red-600 border-none ml-3 text-white p-2 rounded-xl"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                    {/* Add Update button if needed */}
                    <button
                      className="bg-blue-400 hover:bg-slate-400 border-none ml-3 text-white p-2 rounded-xl"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Update
                    </button>
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
};

export default ViewAppointment;
