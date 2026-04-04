"use client";

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { X , ArrowDownLeft , ArrowUpRight } from "lucide-react";
import type { FinanceContextType } from "@/app/context/FinanceContext";

const Page = () => {
    const router = useRouter()
    const searchparams = useSearchParams()

    const name = searchparams.get("name")
    const email = searchparams.get("email")

    const [data, setdata] = useState<FinanceContextType | null>(
        localStorage && JSON.parse(localStorage.getItem("realData") || "null")
    )
    const [user, setuser] = useState(data?.users.find((user) => user.name === name && user.email === email) || null)
    const [accounts, setaccounts] = useState(user?.accounts || [])
    const [transactions , setTransactions] = useState(user?.transactions || [])

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
    onClick={() => router.back()}
  />

  {/* Modal Card */}
  <div className="relative w-full max-w-4xl h-[80vh] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">

    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-2xl font-bold">All Transactions</h2>
      <button
        onClick={() => router.back()}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <X size={24} />
      </button>
    </div>

    {/* Transactions List */}
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
      {transactions?.length === 0 ? (
        <p className="text-gray-500 text-center mt-10 text-lg">
          No transactions found
        </p>
      ) : (
        transactions?.map((tx, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full flex items-center justify-center ${
                  tx.type === "income"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {tx.type === "income" ? (
                  <ArrowDownLeft size={20} />
                ) : (
                  <ArrowUpRight size={20} />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{tx.category}</h3>
                <p className="text-sm text-gray-500">{tx.date}</p>
                <p className="text-sm text-gray-400">{tx.description}</p>
              </div>
            </div>

            {/* Right Section */}
            <div
              className={`font-bold text-lg ${
                tx.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>

    {/* Footer */}
    <div className="p-6 border-t border-gray-200 flex justify-end bg-white">
      <button
        onClick={() => router.back()}
        className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
      >
        Close
      </button>
    </div>

  </div>
</div>
    )
}

export default Page;
