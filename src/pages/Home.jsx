import React, { useEffect, useState } from "react";
import SkipCard from "../components/SkipCard";

export default function Home() {
  const [skips, setSkips] = useState([]);
  const [currentSkip, setCurrentSkip] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        setSkips(await res.json());
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (!skips.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600" />
      </div>
    );
  }

  const vatAmt = currentSkip ? (currentSkip.price_before_vat * currentSkip.vat) / 100 : 0;
  const total = currentSkip ? currentSkip.price_before_vat + vatAmt : 0;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 text-center">
        Choose Your Skip Size
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* skip list */}
        <div className="space-y-4">
          {skips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              setCurrentSkip={setCurrentSkip}
            />
          ))}
        </div>

        {/* details */}
        <div>
          {currentSkip ? (
            <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
              <img
                src="/4-yarder-skip.jpg"
                alt={`${currentSkip.size} yard skip`}
                className="w-full h-48 object-cover rounded-lg mb-4"
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
                {vatAmt.toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Total Price:</span> £
                {total.toFixed(2)}
              </p>
              {currentSkip.transport_cost != null && (
                <p>
                  <span className="font-semibold">Transport Cost:</span> £
                  {currentSkip.transport_cost}
                </p>
              )}
              <p>
                <span className="font-semibold">Allowed on Road:</span>{" "}
                {currentSkip.allowed_on_road ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Allows Heavy Waste:</span>{" "}
                {currentSkip.allows_heavy_waste ? "Yes" : "No"}
              </p>
              <button className="w-full md:w-auto block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
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
