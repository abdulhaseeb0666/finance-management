"use client";

import { motion } from "framer-motion";

export default function LoadingDashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex animate-pulse">

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 p-6 border-r border-white/10 bg-white/5 backdrop-blur-xl space-y-6">
        <div className="h-8 w-32 bg-white/10 rounded-md"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-white/10 rounded-md"></div>
          <div className="h-4 w-20 bg-white/10 rounded-md"></div>
          <div className="h-4 w-28 bg-white/10 rounded-md"></div>
          <div className="h-4 w-16 bg-white/10 rounded-md"></div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="h-5 w-64 bg-white/10 rounded-md"></div>
          <div className="h-8 w-20 bg-white/10 rounded-xl"></div>
        </header>

        {/* CONTENT */}
        <main className="p-6 space-y-6">

          {/* ACCOUNTS */}
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-5 w-32 bg-white/10 rounded-md"></div>
              <div className="h-8 w-20 bg-white/10 rounded-xl"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/10 h-24"></div>
              ))}
            </div>
          </section>

          {/* TRANSACTIONS */}
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-5 w-40 bg-white/10 rounded-md"></div>
              <div className="h-8 w-20 bg-white/10 rounded-xl"></div>
            </div>
            <div className="space-y-3">
              {Array(5).fill(0).map((_, idx) => (
                <div key={idx} className="flex justify-between p-4 rounded-xl bg-white/10 border border-white/10 h-16"></div>
              ))}
            </div>
          </section>

          {/* BUDGETS */}
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-5 w-32 bg-white/10 rounded-md"></div>
              <div className="h-8 w-24 bg-white/10 rounded-xl"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {Array(2).fill(0).map((_, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-3 h-32"></div>
              ))}
            </div>
          </section>

          {/* INSIGHTS & CHARTS */}
          <section className="grid md:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md h-64"></div>
            ))}
          </section>

        </main>
      </div>
    </div>
  );
}