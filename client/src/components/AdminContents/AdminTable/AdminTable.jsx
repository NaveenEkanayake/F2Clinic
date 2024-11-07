import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { getAllIncome } from "@/Api/config";

const AdminTable = ({ isSidebarOpen }) => {
  const [appointmentPrices, setAppointmentPrices] = useState([]);

  useEffect(() => {
    const fetchAllAppointmentPrices = async () => {
      try {
        const response = await getAllIncome();
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

  const weekdays = [
    "monday",
    "tuesday",
    "wed",
    "thursday",
    "friday",
    "saturday",
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
      width={1450}
      height={500}
    />
  );
};

export default AdminTable;
