"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#0B0F19] text-white">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-r from-transparent to-[#0B0F19]" />
        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome Back 👋
          </h1>
          <p className="text-gray-300">
            Loading login page, please wait...
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6 bg-linear-to-l from-[#0B0F19] via-[#0B0F19]/90 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
          <p className="text-gray-400 text-center mb-6">Please wait while we load your login form...</p>

          {/* Form Placeholder */}
          <div className="space-y-4 animate-pulse">
            <div className="w-full h-12 rounded-xl bg-white/10" />
            <div className="w-full h-12 rounded-xl bg-white/10" />
            <div className="w-full h-12 rounded-xl bg-indigo-500/50" />
          </div>

          {/* Footer Placeholder */}
          <div className="text-sm text-center text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <span className="text-indigo-400 font-medium cursor-default">
              Sign Up
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}