import React from "react";

export default function Completed() {
  return (
    <div className="relative flex flex-col bg-white  rounded-xl dark:bg-gray-800">
      <div className="absolute top-2 right-2"></div>
      <div className="p-4 sm:p-10 text-center overflow-y-auto">
        {/* Icon */}
        <span className="mb-4 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border-4 border-green-50 bg-green-100 text-green-500 dark:bg-green-700 dark:border-green-600 dark:text-green-100">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
          </svg>
        </span>
        {/* End Icon */}
        <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
          Submission successful!
        </h3>
        <p className="text-gray-500">Thanks for your response</p>
      </div>
    </div>
  );
}
