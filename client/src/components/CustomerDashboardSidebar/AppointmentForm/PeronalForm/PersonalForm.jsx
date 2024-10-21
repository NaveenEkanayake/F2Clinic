import React from "react";
import PreviousButton from "../PrevoiusButton/PreviousButton";
import SubmitButton from "../SubmitButton/SubmitButton";

const PersonalForm = ({ onBack, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting the personal details form");
    onNext();
  };

  return (
    <form
      className="w-full h-auto flex flex-col items-center gap-7 px-10"
      onSubmit={handleSubmit}
    >
      <div className="w-full relative">
        <p className="text-white text-xl font-semibold text-center mb-6 mt-0">
          Personal Details
        </p>
        <label className="text-white font-semibold">Owner Name</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
          placeholder="Enter owner's name"
          required
        />
      </div>

      <div className="w-full relative">
        <label className="text-white font-semibold">Owner Email</label>
        <input
          type="email"
          className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
          placeholder="Enter owner's email"
          required
        />
      </div>

      <SubmitButton>Submit</SubmitButton>
      <PreviousButton onBack={onBack}>Previous</PreviousButton>
    </form>
  );
};

export default PersonalForm;
