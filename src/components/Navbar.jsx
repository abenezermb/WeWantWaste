import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="/" className="text-2xl font-extrabold hover:text-blue-300 transition">
          WeWantWaste
        </a>

        {/* mobile menu button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24}/> : <FiMenu size={24}/>}
        </button>

        {/* links */}
        <nav className={`${open ? "block" : "hidden"} md:flex md:items-center`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-4 md:mt-0 text-center">
            <li>
              <a href="/" className="text-lg font-medium hover:text-blue-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-lg font-medium hover:text-blue-300 transition">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
