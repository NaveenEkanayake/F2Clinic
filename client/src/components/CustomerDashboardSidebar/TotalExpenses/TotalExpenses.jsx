import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { verifyCustomer, getAllAppointmentPrices } from "@/Api/config";

const TotalExpenses = () => {
  const [appointmentPrices, setAppointmentPrices] = useState([]);

  const data = [{ category: "Appointments", value: 0 }];

  const colors = ["#FFCE56"];

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
          const totalAppointmentPrice = response.totalAppointmentPrice;
          const updatedData = data.map((item) => {
            if (item.category === "Appointments") {
              return { ...item, value: totalAppointmentPrice };
            }
            return item;
          });

          setAppointmentPrices(updatedData);
        } else {
          console.log("Failed to fetch appointment prices.");
        }
      } catch (err) {
        console.error("Error fetching appointment prices:", err);
      }
    };

    fetchAllAppointmentPrices();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "300px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          left: "40px",
          top: "40px",
        }}
      >
        <PieChart
          series={[
            {
              data: appointmentPrices.length
                ? appointmentPrices.map((item, index) => ({
                    value: item.value,
                    color: colors[index],
                  }))
                : [],
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -45,
              endAngle: 225,
              cx: 150,
              cy: 150,
            },
          ]}
          width={500}
          height={500}
        />
        <div style={{ position: "absolute", top: "50px", left: "-70px" }}>
          {appointmentPrices.length
            ? appointmentPrices.map((item, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: colors[index],
                      marginRight: "5px",
                    }}
                  />
                  <span>
                    {item.category}: {item.value}
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default TotalExpenses;
