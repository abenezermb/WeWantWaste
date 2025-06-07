import React from "react";
import StepCard from "./StepCard";
import { FaLocationDot, FaTrashCan } from "react-icons/fa6";
import { FiTruck, FiShield, FiCalendar, FiCreditCard } from "react-icons/fi";

const steps = [
  { title: "Postcode",   active: false, component: FaLocationDot },
  { title: "Waste Type", active: false, component: FaTrashCan },
  { title: "Select Skip",active: true,  component: FiTruck },
  { title: "Permit Check",active: false, component: FiShield },
  { title: "Choose Date", active: false, component: FiCalendar },
  { title: "Payment",     active: false, component: FiCreditCard },
];

export default function Sidebar() {
  return (
    <aside className="h-full p-6 bg-white rounded-lg shadow-lg flex flex-col">
      <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">
        Your Progress
      </h2>
      <nav className="flex-1 overflow-y-auto space-y-4">
        {steps.map((step, i) => (
          <StepCard
            key={i}
            title={step.title}
            active={step.active}
            icon={step.component}
          />
        ))}
      </nav>
    </aside>
  );
}
