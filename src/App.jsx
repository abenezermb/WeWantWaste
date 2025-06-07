import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />

      {/* on small: column; on md+: row */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar hidden on mobile, fixed width on md+ */}
        <aside className="hidden md:block md:w-1/4 lg:w-1/5 bg-transparent">
          <Sidebar />
        </aside>

        {/* Main: full width on mobile, remainder on md+ */}
        <main className="flex-1 p-4 md:p-6">
          <Home />
        </main>
      </div>
    </div>
  );
}
