import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
const ContactusSVG = () => {
  return (
    <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
          <FaMapMarkerAlt className="w-4 h-4 text-green-500 dark:text-green-400" />
        </span>
        <h3 className="font-medium leading-tight">Location</h3>
        <p className="text-sm">31/23 Aniwatte Road, Kandy</p>
      </li>

      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <FaPhoneAlt className="w-4 h-4 text-blue-500 dark:text-blue-400" />
        </span>
        <h3 className="font-medium leading-tight">Phone</h3>
        <p className="text-sm">+94 77 123 4567</p>
      </li>

      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-yellow-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-yellow-900">
          <FaEnvelope className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
        </span>
        <h3 className="font-medium leading-tight">Email</h3>
        <p className="text-sm">furrypetclinic@gmail.com</p>
      </li>
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-red-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-red-900">
          <svg
            className="w-3.5 h-3.5 text-red-500 dark:text-red-400"
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
        <h3 className="font-medium leading-tight">Submit Request</h3>
        <p className="text-sm">
          After filling in your details, submit your request for assistance.
        </p>
      </li>
    </ol>
  );
};

export default ContactusSVG;
