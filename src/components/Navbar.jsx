// navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <header className="bg-blue-900 text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo / Brand */}
        <div className="text-2xl font-extrabold">
          <a href="/" className="hover:text-blue-300 transition-colors">
            WeWantWaste
          </a>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a
                href="/"
                className="text-lg font-medium hover:text-blue-300 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-lg font-medium hover:text-blue-300 transition-colors"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
