import React, { useEffect, useState, useRef } from "react";
import SkipCard from "../components/SkipCard";
import {
  FiCalendar,
  FiTag,
  FiPercent,
  FiCreditCard,
  FiTruck,
} from "react-icons/fi";
import { FaRoad, FaBoxes } from "react-icons/fa";
import Chatbot from "../components/Chatbot";

export default function Home() {
  const [skips, setSkips] = useState([]);
  const [currentSkip, setCurrentSkip] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allowOnRoadOnly, setAllowOnRoadOnly] = useState(false);
  const [heavyWasteOnly, setHeavyWasteOnly] = useState(false);
  const detailsRef = useRef(null);

  // Fetch skip data and select default
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        const data = await response.json();
        setSkips(data);
        if (data.length) setCurrentSkip(data[0]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // Scroll details into view when currentSkip changes on mobile
  useEffect(() => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSkip]);

  // Loading state
  if (!skips.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
      </div>
    );
  }

  // Compute pricing
  const vatAmount = currentSkip
    ? (currentSkip.price_before_vat * currentSkip.vat) / 100
    : 0;
  const totalPrice = currentSkip
    ? currentSkip.price_before_vat + vatAmount
    : 0;

  // Apply search & filters
  const filteredSkips = skips.filter((skip) => {
    const matchSize = skip.size.toString().includes(searchTerm.trim());
    const matchRoad = !allowOnRoadOnly || skip.allowed_on_road;
    const matchHeavy = !heavyWasteOnly || skip.allows_heavy_waste;
    return matchSize && matchRoad && matchHeavy;
  });

  return (
    <>
      <div className="space-y-6 md:w-[90%] mx-auto px-4">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <input
            type="text"
            placeholder="Search by size..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={allowOnRoadOnly}
                onChange={(e) => setAllowOnRoadOnly(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Allowed on Road</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={heavyWasteOnly}
                onChange={(e) => setHeavyWasteOnly(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Heavy Waste</span>
            </label>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 text-center">
          Choose Your Skip Size
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skip List */}
          <div className="space-y-4">
            {filteredSkips.map((skip) => (
              <div key={skip.id}>
                <div
                  onClick={() => setCurrentSkip(skip)}
                  className={`p-1 rounded-lg transition-shadow cursor-pointer ${
                    currentSkip?.id === skip.id
                      ? "ring-4 ring-blue-500"
                      : "hover:shadow-lg"
                  }`}
                >
                  <SkipCard skip={skip} setCurrentSkip={setCurrentSkip} />
                </div>

                {/* Mobile inline details */}
                {currentSkip?.id === skip.id && (
                  <div
                    ref={detailsRef}
                    className="md:hidden p-4 bg-white rounded-lg shadow-lg mt-2 space-y-4"
                  >
                    {/* Image */}
                    <img
                      src="/4-yarder-skip.jpg"
                      alt={`${skip.size} yard skip`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-800">
                      {skip.size} Yard Skip
                    </h2>
                    {/* Details list */}
                    <div className="space-y-2">
                      <DetailRow icon={<FiCalendar />} label="Hire Period" value={`${skip.hire_period_days} days`} />
                      <DetailRow icon={<FiTag />} label="Price (Before VAT)" value={`£${skip.price_before_vat.toLocaleString()}`} />
                      <DetailRow icon={<FiPercent />} label={`VAT (${skip.vat}%)`} value={`£${vatAmount.toFixed(2)}`} />
                      <DetailRow icon={<FiCreditCard />} label="Total Price" value={`£${totalPrice.toFixed(2)}`} />
                      {skip.transport_cost != null && (
                        <DetailRow icon={<FiTruck />} label="Transport Cost" value={`£${skip.transport_cost}`} />
                      )}
                      <DetailRow icon={<FaRoad />} label="Allowed on Road" value={skip.allowed_on_road ? "Yes" : "No"} />
                      <DetailRow icon={<FaBoxes />} label="Allows Heavy Waste" value={skip.allows_heavy_waste ? "Yes" : "No"} />
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                      Choose this Skip
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Details Panel */}
          <div className="hidden md:block md:sticky md:top-20 self-start max-h-[80vh] overflow-auto">
            {currentSkip ? (
              <div className="p-6 bg-white rounded-lg shadow-lg space-y-6">
                {/* Image */}
                <img
                  src="/4-yarder-skip.jpg"
                  alt={`${currentSkip.size} yard skip`}
                  className="w-full h-[35vh] object-cover rounded-lg"
                />
                {/* Title */}
                <h2 className="text-3xl font-semibold text-gray-800">
                  {currentSkip.size} Yard Skip
                </h2>
                {/* Details grid */}
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <DetailGridRow icon={<FiCalendar />} label="Hire Period" value={`${currentSkip.hire_period_days} days`} />
                  <DetailGridRow icon={<FiTag />} label="Price (Before VAT)" value={`£${currentSkip.price_before_vat.toLocaleString()}`} />
                  <DetailGridRow icon={<FiPercent />} label={`VAT (${currentSkip.vat}%)`} value={`£${vatAmount.toFixed(2)}`} />
                  <DetailGridRow icon={<FiCreditCard />} label="Total Price" value={`£${totalPrice.toFixed(2)}`} />
                  {currentSkip.transport_cost != null && (
                    <DetailGridRow icon={<FiTruck />} label="Transport Cost" value={`£${currentSkip.transport_cost}`} />
                  )}
                  <DetailGridRow icon={<FaRoad />} label="Allowed on Road" value={currentSkip.allowed_on_road ? "Yes" : "No"} />
                  <DetailGridRow icon={<FaBoxes />} label="Allows Heavy Waste" value={currentSkip.allows_heavy_waste ? "Yes" : "No"} />
                </dl>
                {/* Action */}
                <button className="mt-6 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-lg">
                  Choose this Skip
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 italic">
                Select a skip size to see details
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <div className="fixed bottom-4 right-4">
        <Chatbot />
      </div>
    </>
  );
}

// Helper components for detail rows
const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 text-gray-700">
    <div className="text-blue-600">{icon}</div>
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
);

const DetailGridRow = ({ icon, label, value }) => (
  <div>
    <dt className="flex items-center text-sm font-medium text-gray-500 space-x-2">
      <div className="text-blue-600">{icon}</div>
      <span>{label}</span>
    </dt>
    <dd className="mt-1 text-lg text-gray-700">{value}</dd>
  </div>
);
