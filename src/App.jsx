// app.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Home />
      </div>
    </div>
  );
}
