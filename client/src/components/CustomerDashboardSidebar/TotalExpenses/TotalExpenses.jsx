import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const TotalExpenses = () => {
  const data = [
    { category: "Rent", value: 400 },
    { category: "Utilities", value: 300 },
    { category: "Salaries", value: 500 },
    { category: "Supplies", value: 200 },
  ];

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

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
      <div style={{ position: "relative", width: "300px", height: "300px" }}>
        <PieChart
          series={[
            {
              data: data.map((item, index) => ({
                value: item.value,
                color: colors[index],
              })),
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
          width={300}
          height={300}
        />
        <div style={{ position: "absolute", top: "70px", left: "-50px" }}>
          {data.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalExpenses;
