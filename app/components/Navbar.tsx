"use client";

import { useState } from "react";
import {Menu , X} from "lucide-react";


const Navbar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  
  return (
<nav className="relative z-10 w-full bg-[#0B0F19] shadow-[0px_2px_25px_rgba(168,85,247,0.5)]">
      <div className="absolute z-10 inset-0 bg-linear-to-r from-indigo-600 via-cyan-600 to-purple-600 blur-3xl" />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-white text-2xl sm:text-3xl md:text-4xl font-bold cursor-pointer hover:scale-105 transition-transform">
          Monetra
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <a
            href="/login"
            className="text-white text-lg md:text-xl font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-white text-lg md:text-xl text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-white/90 hover:text-indigo-700 transition"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-indigo-950/95 backdrop-blur-md">
          <a
            href="/login"
            className="text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-white text-indigo-600 text-lg font-semibold px-4 py-2 rounded-lg hover:bg-white/90 hover:text-indigo-700 transition"
          >
            Sign Up
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
