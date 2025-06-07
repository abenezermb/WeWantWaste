import React from "react";
import { FiTrash2 } from "react-icons/fi";

const SkipCard = ({ skip, setCurrentSkip }) => {
  return (
    <div
      onClick={() => setCurrentSkip(skip)}
      className="cursor-pointer p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow ease-in-out duration-200 flex items-center space-x-4 border border-gray-100"
    >
      {/* Icon representing the skip */}
      <FiTrash2 size={36} className="text-blue-600" />

      {/* Skip details */}
      <div className="flex-1">
        <p className="text-xl font-semibold text-gray-800">
          {skip.size} Yard Skip
        </p>
        {skip.price_before_vat !== undefined && (
          <p className="mt-1 text-sm text-gray-500">
            £{skip.price_before_vat.toLocaleString()} before VAT
          </p>
        )}
      </div>

      {/* Arrow indicator */}
      <div className="text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default SkipCard;
