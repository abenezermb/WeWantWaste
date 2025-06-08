import React from "react";
import StepCard from "./StepCard";
import { FaTrashCan, FaLocationDot } from "react-icons/fa6";
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
    <aside className="  hidden md:flex flex-col fixed top-20 left-0 bottom-0 w-72 bg-white p-6 rounded-tr-2xl rounded-br-2xl shadow-xl overflow-y-auto z-40">
      {/* Sidebar Header */}
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Your Progress
      </h2>

      {/* Steps Navigation */}
      <nav className="flex-1 space-y-4">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            title={step.title}
            active={step.active}
            icon={step.component}
          />
        ))}
      </nav>
    </aside>
  );
}
