import React, { useEffect, useState } from "react";
import SkipCard from "../components/SkipCard";
import {
  FiCalendar,
  FiTag,
  FiPercent,
  FiCreditCard,
  FiTruck,
} from "react-icons/fi";
import { FaRoad, FaBoxes } from "react-icons/fa";

export default function Home() {
  const [skips, setSkips] = useState([]);
  const [currentSkip, setCurrentSkip] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        const data = await response.json();
        setSkips(data);
        // select first skip by default
        if (data.length > 0) {
          setCurrentSkip(data[0]);
        }
      } catch (error) {
        console.error("Error fetching skips:", error);
      }
    })();
  }, []);

  // Show loading spinner while data is fetching
  if (!skips.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
      </div>
    );
  }

  // Compute VAT and total price for selected skip
  const vatAmount = currentSkip
    ? (currentSkip.price_before_vat * currentSkip.vat) / 100
    : 0;
  const totalPrice = currentSkip ? currentSkip.price_before_vat + vatAmount : 0;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 text-center">
        Choose Your Skip Size
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skip list with inline details on mobile */}
        <div className="space-y-4">
          {skips.map((skip) => (
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

              {/* Inline details for mobile only */}
              {currentSkip?.id === skip.id && (
                <div className="md:hidden p-4 bg-white rounded-lg shadow-lg mt-2 space-y-4">
                  <img
                    src="/4-yarder-skip.jpg"
                    alt={`${currentSkip.size} yard skip`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {currentSkip.size} Yard Skip
                  </h2>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FiCalendar className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Hire Period:</span>
                      <span>{currentSkip.hire_period_days} days</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FiTag className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Price (Before VAT):</span>
                      <span>£{currentSkip.price_before_vat.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FiPercent className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">VAT ({currentSkip.vat}%):</span>
                      <span>£{vatAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FiCreditCard className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Total Price:</span>
                      <span>£{totalPrice.toFixed(2)}</span>
                    </div>
                    {currentSkip.transport_cost != null && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <FiTruck className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">Transport Cost:</span>
                        <span>£{currentSkip.transport_cost}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FaRoad className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Allowed on Road:</span>
                      <span>{currentSkip.allowed_on_road ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FaBoxes className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Allows Heavy Waste:</span>
                      <span>{currentSkip.allows_heavy_waste ? "Yes" : "No"}</span>
                    </div>
                  </div>

                  <button
                    className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                  >
                    Choose this Skip
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Details panel for md+ devices */}
        <div className="hidden md:block">
          {currentSkip ? (
            <div className="p-6 bg-white rounded-lg shadow-lg space-y-6">
              {/* Skip Image */}
              <img
                src="/4-yarder-skip.jpg"
                alt={`${currentSkip.size} yard skip`}
                className="w-full h-48 object-cover rounded-lg"
              />

              {/* Title */}
              <h2 className="text-3xl font-semibold text-gray-800">
                {currentSkip.size} Yard Skip
              </h2>

              {/* Details */}
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500 space-x-2">
                    <FiCalendar className="w-5 h-5 text-blue-600" />
                    <span>Hire Period</span>
                  </dt>
                  <dd className="mt-1 text-lg text-gray-700">
                    {currentSkip.hire_period_days} days
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500 space-x-2">
                    <FiTag className="w-5 h-5 text-blue-600" />
                    <span>Price (Before VAT)</span>
                  </dt>
                  <dd className="mt-1 text-lg text-gray-700">
                    £{currentSkip.price_before_vat.toLocaleString()}
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500 space-x-2">
                    <FiPercent className="w-5 h-5 text-blue-600" />
                    <span>VAT ({currentSkip.vat}%)</span>
                  </dt>
                  <dd className="mt-1 text-lg text-gray-700">
                    £{vatAmount.toFixed(2)}
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500 space-x-2">
                    <FiCreditCard className="w-5 h-5 text-blue-600" />
                    <span>Total Price</span>
                  </dt>
                  <dd className="mt-1 text-lg text-gray-700">
                    £{totalPrice.toFixed(2)}
                  </dd>
                </div>

                {currentSkip.transport_cost != null && (
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500 space-x-2">
                      <FiTruck className="w-5 h-5 text-blue-600" />
                      <span>Transport Cost</span>
                    </dt>
                    <dd className="mt-1 text-lg text-gray-700">
                      £{currentSkip.transport_cost}
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500 space-x-2">
                    <FaRoad className="w-5 h-5 text-blue-600" />
                    <span>Allowed on Road</span>
                  </dt>
                  <dd className="mt-1 text-lg text-gray-700">
                    {currentSkip.allowed_on_road ? "Yes" : "No"}
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500 space-x-2">
                    <FaBoxes className="w-5 h-5 text-blue-600" />
                    <span>Allows Heavy Waste</span>
                  </dt>
                  <dd className="mt-1 text-lg text-gray-700">
                    {currentSkip.allows_heavy_waste ? "Yes" : "No"}
                  </dd>
                </div>
              </dl>

              {/* Action Button */}
              <button className="mt-6 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
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
  );
}
