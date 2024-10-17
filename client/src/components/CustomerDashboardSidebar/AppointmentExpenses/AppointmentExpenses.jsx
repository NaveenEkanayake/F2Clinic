import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
} from "recharts";

const data = [
  { month: "January", Payment: 4000 },
  { month: "February", Payment: 3000 },
  { month: "March", Payment: 3000 },
  { month: "April", Payment: 2300 },
  { month: "May", Payment: 2400 },
  { month: "June", Payment: 2500 },
  { month: "July", Payment: 1000 },
  { month: "August", Payment: 1500 },
  { month: "September", Payment: 2000 },
  { month: "October", Payment: 2300 },
  { month: "November", Payment: 2500 },
  { month: "December", Payment: 2900 },
];

const AppointmentExpenses = ({ isSidebarOpen }) => {
  return (
    <div
      className={`bg-slate-700 w-[450px] flex flex-row ml-[-85px] rounded-lg items-center justify-center h-[350px] ${
        isSidebarOpen ? "w-[450px]" : "w-[545px]"
      }`}
    >
      <LineChart
        width={550}
        height={300}
        data={data}
        margin={{ top: 10, left: 10, right: 50, bottom: 5 }}
      >
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="Payment" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </div>
  );
};

export default AppointmentExpenses;
