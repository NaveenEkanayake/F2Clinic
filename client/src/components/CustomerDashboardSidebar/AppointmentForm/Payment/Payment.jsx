import React from "react";

const Payment = ({ onBack, onConfirm }) => {
  return (
    <form className="w-full h-auto flex flex-col items-center gap-7 px-10">
      <p className="text-white text-xl font-semibold">Payment Details</p>
      <div className="w-full relative">
        <label className="text-white font-semibold">Cardholder Name</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
          placeholder="Enter cardholder name"
        />
      </div>

      <div className="w-full relative">
        <label className="text-white font-semibold">Card Number</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
          placeholder="Enter card number"
        />
      </div>

      <div className="w-full flex gap-4">
        <div className="relative w-1/2">
          <label className="text-white font-semibold">Expiry Date</label>
          <input
            type="month"
            className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
          />
        </div>
        <div className="relative w-1/2">
          <label className="text-white font-semibold">CVV</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-white focus:outline-none"
            placeholder="CVV"
          />
        </div>
      </div>

      <div className="w-full flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white py-2 px-8 rounded-lg outline-none"
        >
          Back
        </button>
        <button
          type="submit"
          onClick={onConfirm}
          className="text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white py-2 px-8 rounded-lg outline-none"
        >
          Confirm Payment
        </button>
      </div>
    </form>
  );
};

export default Payment;
