import React, { useState, useEffect } from "react";

const Clock = ({ datediff }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeWithDiff = (date, diff) => {
    const newDate = new Date(date.getTime() + diff * 3600 * 1000);
    return newDate;
  };

  const calculateRotation = (value, max) => {
    return (value / max) * 360;
  };

  const { hours, minutes, seconds } = {
    hours: getTimeWithDiff(time, datediff).getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds(),
  };

  const hourRotation =
    calculateRotation(hours % 12, 12) + calculateRotation(minutes, 60) / 12;
  const minuteRotation =
    calculateRotation(minutes, 60) + calculateRotation(seconds, 60) / 60;
  const secondRotation = calculateRotation(seconds, 60);

  return (
    <div>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        style={{ border: "1px solid black", borderRadius: "50%" }}
      >
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="55"
          transform={`rotate(${hourRotation} 100 100)`}
          stroke="black"
          strokeWidth="4"
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="40"
          transform={`rotate(${minuteRotation} 100 100)`}
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          transform={`rotate(${secondRotation} 100 100)`}
          stroke="red"
          strokeWidth="1"
        />
        {/* Center dot */}
        <circle cx="100" cy="100" r="2" fill="black" />
      </svg>
    </div>
  );
};

export default Clock;
