"use client";

import Link from "next/link";
import MonthlyLineChart from "../components/(dummy)/MonthlyLineChart";
import SpendingPieChart from "../components/(dummy)/SpendingPieChart";
import { financeData } from "../data/financeData";

import { use, useContext, useEffect, useState } from "react";
import { FinanceContext , FinanceContextType } from "../context/FinanceContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();

  const login = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem("login") || "null") : null;

  useEffect(() => {
    if (login && login.name && login.email) {
      router.push("/dashboard?name=" + login.name + "&email=" + login.email);
    }
  }, [router, login]);

  const realData : FinanceContextType | null = useContext(FinanceContext);
  if(typeof localStorage !== "undefined"){
    if(!(localStorage.getItem("realData"))){
      localStorage.setItem("realData", JSON.stringify(realData));
    }
  }
  
  const finance = financeData;

  if (!finance) return <p>Loading...</p>;
  
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white space-y-10">

      {/* HERO */}
      <section className="relative text-center py-28 overflow-hidden ">
        
        {/* Background Glow */}
        <div className="absolute inset-0 bg-linear-to-r from-indigo-500/20 via-cyan-500/10 to-purple-500/20 blur-3xl" />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Smarter Financial <br />
          <span className="text-indigo-400">Decisions</span>
        </motion.h1>

        <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
          Track expenses, analyze trends, and forecast your growth — all in one powerful dashboard.
        </p>

        <Link href="/signup">
          <button className="px-8 py-3 relative z-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition hover:scale-105 shadow-lg shadow-indigo-500/30">
            Get Started →
          </button>
        </Link>

      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 px-10">
        {[
          { title: "Track Spending", desc: "Monitor every transaction in real-time." },
          { title: "Smart Insights", desc: "Get AI-like financial suggestions." },
          { title: "Analytics", desc: "Visualize trends and optimize spending." },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CHARTS */}
      <section className="grid md:grid-cols-2 gap-8 px-10">
        
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:shadow-xl transition">
          <MonthlyLineChart />
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:shadow-xl transition">
          <SpendingPieChart />
        </div>

      </section>

      {/* TRANSACTIONS (MODERN CARDS) */}
      <section className="px-10">
        <h2 className="text-2xl font-semibold mb-6">Recent Transactions</h2>

        <div className="space-y-4">
          {finance.transactions.slice(0, 5).map((txn) => (
            <div
              key={txn.id}
              className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:-translate-y-1 hover:shadow-lg transition"
            >
              {/* LEFT */}
              <div>
                <p className="font-medium">{txn.category}</p>
                <p className="text-sm text-gray-400">{txn.description}</p>
                <p className="text-xs text-gray-500">{txn.date}</p>
              </div>

              {/* RIGHT */}
              <p
                className={`text-lg font-semibold ${
                  txn.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {txn.type === "income" ? "+" : "-"}${txn.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-10 pb-10">
        <div className="relative p-12 rounded-2xl bg-linear-to-r from-indigo-500/20 to-purple-500/20 border border-white/10 overflow-hidden">
          
          <div className="absolute inset-0 bg-indigo-500/10 blur-2xl" />

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Take control of your financial future
          </h2>

          <p className="text-gray-300 mb-8">
            Start tracking and optimizing your finances today.
          </p>

          <Link href="/signup">
            <button className="px-8 py-3 relative z-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
          </Link>

        </div>
      </section>

    </div>
  );
}