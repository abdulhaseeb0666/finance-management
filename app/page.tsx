"use client";

import Link from "next/link";
import MonthlyLineChart from "./components/(dummy)/MonthlyLineChart";
import SpendingPieChart from "./components/(dummy)/SpendingPieChart";
import { financeData } from "./data/financeData";

import { use, useContext, useEffect, useState } from "react";
import { FinanceContext , FinanceContextType } from "./context/FinanceContext";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Smarter Financial Decisions
        </h1>
        <p className="text-gray-600 mb-6">
          Track expenses, analyze trends, and forecast growth in one dashboard.
        </p>
        <Link href={"/signup"}>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 hover:cursor-pointer">
            Get Started
          </button>
        </Link>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <MonthlyLineChart />
        <SpendingPieChart />
      </section>

      {/* Top Transactions */}
      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {finance.transactions.slice(0, 5).map(txn => (
                <tr key={txn.id} className="border-b">
                  <td className="px-4 py-2">{txn.date}</td>
                  <td className="px-4 py-2">{txn.category}</td>
                  <td className="px-4 py-2">{txn.description}</td>
                  <td
                    className={`px-4 py-2 text-right ${
                      txn.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${txn.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-indigo-600 text-white rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Take control of your financial future
        </h2>
        <p className="mb-6">
          Start tracking and analyzing your finances today.
        </p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          <Link href={"/signup"}>Start Free Trial</Link>
        </button>
      </section>
    </div>
  );
}