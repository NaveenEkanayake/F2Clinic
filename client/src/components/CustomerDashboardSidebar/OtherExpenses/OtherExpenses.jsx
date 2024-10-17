import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
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

const OtherExpenses = ({ isSidebarOpen }) => {
  return (
    <>
      <h2 className="text-black text-xl font-medium items-center ml-16 justify-center mt-10 mb-6">
        Care Supply Expenses
      </h2>
      <div
        className={`bg-slate-700 flex flex-row ml-[-85px] rounded-lg items-center justify-center h-[400px] ${
          isSidebarOpen ? "w-[450px]" : "w-[545px]"
        }`}
      >
        <div
          className="chart-wrapper"
          style={{ width: "100%", height: "100%" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 10,
                right: 50,
                bottom: 5,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Payment" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="Payment" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default OtherExpenses;
