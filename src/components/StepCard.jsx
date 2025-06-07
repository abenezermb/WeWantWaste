import React from "react";
import { motion } from "framer-motion";

const StepCard = ({ icon: Icon, title, active }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: active ? 1.02 : 1.05 }}
      className={`flex items-center w-full p-4 space-x-4 rounded-2xl cursor-pointer transition-all duration-200
        ${active
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
      `}
    >
      {/* Icon container */}
      <div className={`p-2 rounded-full flex items-center justify-center
        ${active ? "bg-white text-blue-600" : "bg-gray-200 text-gray-500"}
      `}>
        <Icon size={20} />
      </div>

      {/* Step title */}
      <span className="flex-1 text-lg font-semibold truncate">
        {title}
      </span>

      {/* Active indicator */}
      {active && (
        <div className="w-3 h-3 bg-white rounded-full" />
      )}
    </motion.div>
  );
};

export default StepCard;
