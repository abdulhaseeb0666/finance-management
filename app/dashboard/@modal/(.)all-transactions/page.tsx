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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Overlay Card */}
      <div 
        onClick={() => {
            router.back();
        }}
        className="w-full max-w-3xl h-[80vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">All Transactions</h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Transactions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {transactions?.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              No transactions found
            </p>
          )}

          {transactions?.map((tx , idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-xl border hover:shadow-sm transition"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    tx.type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {tx.type === "income" ? (
                    <ArrowDownLeft size={18} />
                  ) : (
                    <ArrowUpRight size={18} />
                  )}
                </div>

                <div>
                  <h3 className="font-medium">{tx.category}</h3>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
              </div>

              {/* Right */}
              <div
                className={`font-semibold ${
                  tx.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}
                {tx.amount}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end">
          <button
            className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    )
}

export default Page;
