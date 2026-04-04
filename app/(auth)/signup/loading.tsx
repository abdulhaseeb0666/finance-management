// app/loading.tsx
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F19] text-white space-y-6 px-4">
      
      {/* Glowing Frosted Card */}
      <motion.div
        className="w-40 h-40 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg shadow-indigo-500/30"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        {/* Spinner Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-indigo-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="text-gray-400 font-medium text-lg"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        Preparing your account...
      </motion.p>

    </div>
  );
}