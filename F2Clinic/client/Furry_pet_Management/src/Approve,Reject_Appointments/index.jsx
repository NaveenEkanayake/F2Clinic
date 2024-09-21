import React from "react";

const ApReject = () => {
  // Total number of appointments (example)
  const totalAppointments = 20;

  // Appointment counts
  const pendingAppointments = 10;
  const approvedAppointments = 8;
  const rejectedAppointments = 2;

  // Calculate percentages based on the total appointments
  const pendingPercentage = (pendingAppointments / totalAppointments) * 100;
  const approvedPercentage = (approvedAppointments / totalAppointments) * 100;
  const rejectedPercentage = (rejectedAppointments / totalAppointments) * 100;

  return (
    <div
      className="flex justify-around space-x-4"
      style={{
        fontFamily: "Times New Roman, sans-serif",
        marginTop: "80px",
      }}
    >
      {/* Pending Appointment */}
      <div className="inline-block bg-white shadow-lg rounded-lg p-10 text-center w-1/4 relative">
        <h2 className="text-xl font-bold">Pending Appointment</h2>
        <p className="text-2xl font-semibold mt-4">{pendingAppointments}</p>
        <div className="absolute bottom-0 left-0 w-full bg-gray-200 h-3 rounded-b-lg">
          <div
            className="bg-blue-500 h-3 rounded-b-lg"
            style={{ width: `${pendingPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Approved Appointment */}
      <div className="inline-block bg-white shadow-lg rounded-lg p-6 text-center w-1/4 relative">
        <h2 className="text-xl font-bold">Approved Appointment</h2>
        <p className="text-2xl font-semibold mt-4">{approvedAppointments}</p>
        <div className="absolute bottom-0 left-0 w-full bg-gray-200 h-3 rounded-b-lg">
          <div
            className="bg-green-500 h-3 rounded-b-lg"
            style={{ width: `${approvedPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Rejected Appointment */}
      <div className="inline-block bg-white shadow-lg rounded-lg p-6 text-center w-1/4 relative">
        <h2 className="text-xl font-bold">Rejected Appointment</h2>
        <p className="text-2xl font-semibold mt-4">{rejectedAppointments}</p>
        <div className="absolute bottom-0 left-0 w-full bg-gray-200 h-3 rounded-b-lg">
          <div
            className="bg-red-500 h-3 rounded-b-lg"
            style={{ width: `${rejectedPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ApReject;
