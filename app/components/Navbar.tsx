"use client";

import { useState } from "react";
import {Menu , X} from "lucide-react";
import { Landmark } from "lucide-react";

const Navbar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  
  return (
<nav className="relative z-10 w-full bg-[#0B0F19] shadow-[0px_2px_25px_rgba(168,85,247,0.5)]">
      <div className="absolute z-10 inset-0 bg-linear-to-r from-indigo-600 via-cyan-600 to-purple-600 blur-3xl" />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="group flex items-center gap-3 cursor-pointer transition-all duration-300">
  
          {/* Icon */}
          <div className="p-2 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg group-hover:scale-110 transition-all duration-300">
            <Landmark size={32} className="text-white" />
          </div>

          {/* Text */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-linear-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent tracking-wide group-hover:tracking-wider transition-all duration-300">
            Monetra
          </h1>

        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <a
            href="/about"
            className="text-white text-lg md:text-xl font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-white text-lg md:text-xl font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition"
          >
            Contact
          </a>
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
        <div className="md:hidden relative z-10 px-6 pb-4 flex flex-col gap-4 bg-linear-to-r from-indigo-900 via-cyan-900 to-purple-900 overflow-hidden backdrop-blur-md">
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
