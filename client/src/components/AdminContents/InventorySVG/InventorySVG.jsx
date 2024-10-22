import React from "react";

const InventorySVG = () => {
  return (
    <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <svg
            className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
        </span>
        <h3 className="font-medium leading-tight">Inventory Info</h3>
        <p className="text-sm">Add your Inventory Info here!!! .</p>
      </li>
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-yellow-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-yellow-900">
          <svg
            className="w-3.5 h-3.5 text-yellow-500 dark:text-yellow-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
        </span>
        <h3 className="font-medium leading-tight">Finish Process</h3>
        <p className="text-sm">Click the button below to finish the process.</p>
      </li>
    </ol>
  );
};

export default InventorySVG;
