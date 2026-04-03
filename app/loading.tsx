// app/loading.tsx
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F19] text-white space-y-6">
      
      {/* Glowing Logo / Spinner */}
      <motion.div
        className="w-16 h-16 rounded-full bg-indigo-500/30 shadow-lg shadow-indigo-500/50"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      />

      {/* Loading Text */}
      <motion.p
        className="text-lg text-gray-400 font-medium"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading dashboard...
      </motion.p>

      {/* Pulsing bars */}
      <div className="flex space-x-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-8 bg-indigo-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
          />
        ))}
      </div>

    </div>
  );
}