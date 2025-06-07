import React, { useEffect, useState } from "react";
import SkipCard from "../components/SkipCard";

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
  const totalPrice = currentSkip
    ? currentSkip.price_before_vat + vatAmount
    : 0;

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
                <div className="md:hidden p-4 bg-white rounded-lg shadow-lg mt-2 space-y-2">
                  <img
                    src="/4-yarder-skip.jpg"
                    alt={`${currentSkip.size} yard skip`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h2 className="text-2xl font-semibold">
                    {currentSkip.size} Yard Skip
                  </h2>
                  <p>
                    <span className="font-semibold">Hire Period:</span>{" "}
                    {currentSkip.hire_period_days} days
                  </p>
                  <p>
                    <span className="font-semibold">Price (before VAT):</span> £
                    {currentSkip.price_before_vat.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">VAT ({currentSkip.vat}%):</span> £
                    {vatAmount.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold">Total Price:</span> £
                    {totalPrice.toFixed(2)}
                  </p>
                  {currentSkip.transport_cost != null && (
                    <p>
                      <span className="font-semibold">Transport Cost:</span> £
                      {currentSkip.transport_cost}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Allowed on Road:</span> {currentSkip.allowed_on_road ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-semibold">Allows Heavy Waste:</span> {currentSkip.allows_heavy_waste ? "Yes" : "No"}
                  </p>
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
            <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
              <img
                src="/4-yarder-skip.jpg"
                alt={`${currentSkip.size} yard skip`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-3xl font-semibold">
                {currentSkip.size} Yard Skip
              </h2>
              <p>
                <span className="font-semibold">Hire Period:</span> {currentSkip.hire_period_days} days
              </p>
              <p>
                <span className="font-semibold">Price (before VAT):</span> £{currentSkip.price_before_vat.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">VAT ({currentSkip.vat}%):</span> £{vatAmount.toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Total Price:</span> £{totalPrice.toFixed(2)}
              </p>
              {currentSkip.transport_cost != null && (
                <p>
                  <span className="font-semibold">Transport Cost:</span> £{currentSkip.transport_cost}
                </p>
              )}
              <p>
                <span className="font-semibold">Allowed on Road:</span> {currentSkip.allowed_on_road ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Allows Heavy Waste:</span> {currentSkip.allows_heavy_waste ? "Yes" : "No"}
              </p>
              <button
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
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