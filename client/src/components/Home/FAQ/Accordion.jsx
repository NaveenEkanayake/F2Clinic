import Button from "./Button/Button";
import React, { useState } from "react";

const Accordion = ({ title, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="py-2">
        <div className="flex items-center">
          <Button
            title={title}
            icon={open ? "-" : "+"}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out text-white text-lg ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden py-2">{answer}</div>
      </div>
    </>
  );
};

export default Accordion;
