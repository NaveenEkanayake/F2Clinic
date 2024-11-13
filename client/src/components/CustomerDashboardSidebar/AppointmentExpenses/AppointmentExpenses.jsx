import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { verifyCustomer, getAllAppointmentPrices } from "@/Api/config";

const AppointmentExpenses = ({ isSidebarOpen }) => {
  const [appointmentPrices, setAppointmentPrices] = useState([]);

  useEffect(() => {
    const fetchAllAppointmentPrices = async () => {
      try {
        const UserId = verifyCustomer();
        if (!UserId) {
          console.log("User ID not found.");
          return;
        }

        const response = await getAllAppointmentPrices();
        if (response && response.totalAppointmentPrice) {
          const priceData = generatePriceData(response.totalAppointmentPrice);
          setAppointmentPrices(priceData);
        } else {
          console.log("Failed to fetch appointment prices.");
        }
      } catch (err) {
        console.error("Error fetching appointment prices:", err);
      }
    };

    fetchAllAppointmentPrices();
  }, []);

  const generatePriceData = (totalPrice) => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      data.push(totalPrice * (i / 10));
    }
    return data;
  };

  // You can adjust this array to include actual months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
  ];

  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
      series={[
        {
          data: appointmentPrices,
          showMark: ({ index }) => index % 2 === 0,
        },
      ]}
      width={250}
      height={250}
    />
  );
};

export default AppointmentExpenses;
