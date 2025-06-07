import StepCard from "./StepCard";
import { FaTrashCan, FaLocationDot } from "react-icons/fa6";
import { FiTruck, FiShield, FiCalendar, FiCreditCard } from "react-icons/fi";

const steps = [
  { title: "Postcode", active: false, component: FaLocationDot },
  { title: "Waste Type", active: false, component: FaTrashCan },
  { title: "Select Skip", active: true, component: FiTruck },
  { title: "Permit Check", active: false, component: FiShield },
  { title: "Choose Date", active: false, component: FiCalendar },
  { title: "Payment", active: false, component: FiCreditCard },
];

export default function Sidebar() {
  return (
    <aside className="w-1/5 h-[65vh] ml-60">
      <div className="bg-white h-full px-2 flex flex-col items-center pt-6">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-2 mt-9">
          Your progress
        </h1>
        {steps.map((step) => (
          <StepCard
            title={step.title}
            active={step.active}
            icon={step.component}
          />
        ))}
      </div>
    </aside>
  );
}
