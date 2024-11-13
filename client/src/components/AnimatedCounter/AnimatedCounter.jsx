import React, { useState, useEffect } from "react";

const AnimatedCounter = ({ from, to }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    setCount(from);
    let startTime = null;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentCount = Math.min(
        from + Math.floor((to - from) * (progress / duration)),
        to
      );

      setCount(currentCount);
      if (currentCount < to) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    return () => {
      setCount(from);
    };
  }, [from, to]);

  return <span>{count}</span>;
};

export default AnimatedCounter;
