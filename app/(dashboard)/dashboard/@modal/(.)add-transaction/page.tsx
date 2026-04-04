"use client";

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import type { FinanceContextType } from "@/app/context/FinanceContext";
import { X } from "lucide-react";

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
  const [budget, setbudget] = useState(user?.budgets || [])
  
  const [error, seterror] = useState("")
  const [account, setaccount] = useState("")
  const [amount, setamount] = useState("")
  const [description, setdescription] = useState("")
  const [date, setdate] = useState("")
  const [type, settype] = useState("")
  const [category, setcategory] = useState("")

  function handleSubmit(e : React.FormEvent) {
    e.preventDefault();

    const accountBalance = user?.accounts.find((acc) => acc.id === account)?.balance || 0;
    
    const newTransaction = {
        id : `txn_00${transactions.length+1}`,
        date: date,
        type: type,
        category: category,
        amount: Number(amount),
        accountId: account,
        description: description,
    }

    if (type === "expense" && Number(amount) > accountBalance) {
        seterror("Insufficient balance in the selected account.");
        return;
    }

    if (type === "expense" && Number(amount) <= accountBalance) {
        const updatedData = { ...data };
        updatedData.users = updatedData.users?.map((u) => {
            if (u.name === name && u.email === email) {
                return {
                    ...u,
                    accounts: u.accounts.map((acc) => {
                        if (acc.id === account) {
                            return { ...acc, balance: acc.balance - Number(amount) };
                        }
                        return acc;
                    }),
                    budgets: u.budgets.map((b) => {
                      if (b.category === category) {
                        return { ...b, spent: b.spent + Number(amount) };
                      }
                      return b;
                    }),
                    insights : [...u.insights , {
                        id : `ins_00${u.insights.length+1}`,
                        type : "expense",
                        message : `You spent $${amount} on ${category} on ${date}.`
                      }
                    ],
                    spendingByCategory : [ ...u.spendingByCategory.filter((s) => s.name !== category) ,
                        {
                            name : category,
                            value : (u.spendingByCategory.find((s) => s.name === category)?.value || 0) + Number(amount)
                        }
                    ],
                    transactions: [...u.transactions, newTransaction] // optional
                };
            }
            return u;
        });
        localStorage.setItem("realData", JSON.stringify(updatedData));
    }

    if(type === "expense" && Number(amount) <= accountBalance) {
      budget.forEach((b) => {
        if(b.category === category) {
          if(b.limit && b.spent + Number(amount) > b.limit) {
            const updatedData = { ...data };
            updatedData.users = updatedData.users?.map((u) => {
                if (u.name === name && u.email === email) {
                    return {
                      ...u,
                      accounts: u.accounts.map((acc) => {
                      if (acc.id === account) {
                          return { ...acc, balance: acc.balance - Number(amount) };
                      }
                      return acc;
                      }),
                      budgets: u.budgets.map((b) => {
                        if (b.category === category) {
                          return { ...b, spent: b.spent + Number(amount) };
                        }
                        return b;
                      }),
                      insights : [...u.insights , {
                          id : `ins_00${u.insights.length+1}`,
                          type : "Budget Alert",
                          message : "Your spending in category '" + category + "' has exceeded the budget limit."
                        }
                      ],
                      spendingByCategory : [ ...u.spendingByCategory.filter((s) => s.name !== category) ,
                      {
                          name : category,
                          value : (u.spendingByCategory.find((s) => s.name === category)?.value || 0) + Number(amount)
                      }
                      ],
                      transactions: [...u.transactions, newTransaction] // optional
                    };
                }
                return u;
            });
            localStorage.setItem("realData", JSON.stringify(updatedData));
          }
        }
      });
    }

    if(type === "income"){
        const updatedData = { ...data };
        updatedData.users = updatedData.users?.map((u) => {
            if (u.name === name && u.email === email) {
                return {
                    ...u,
                    accounts: u.accounts.map((acc) => {
                        if (acc.id === account) {
                            return { ...acc, balance: acc.balance + Number(amount) };
                        }
                        return acc;
                    }),
                    insights : [...u.insights , {
                        id : `ins_00${u.insights.length+1}`,
                        type : "income",
                        message : `You earned $${amount} from ${category} on ${date}.`
                      }
                    ],
                    transactions: [...u.transactions, newTransaction] // optional
                };
            }
            return u;
        });
        localStorage.setItem("realData", JSON.stringify(updatedData));
    }
    alert("Reload Page to see the new transaction added.");
    router.back();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
    onClick={() => router.back()}
  />

  {/* Modal Card */}
  <div className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 z-10 animate-fadeIn">

    {/* Header */}
    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
      <h2 className="text-2xl font-bold text-gray-800">Add Transaction</h2>
      <button
        onClick={() => router.back()}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <X size={22} />
      </button>
    </div>

    {/* Error */}
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Account */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Account</label>
        <select
          name="account"
          value={account}
          onChange={(e) => setaccount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        >
          <option value="">Select Account</option>
          {user?.accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>{acc.name}</option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
      </div>

      {/* Type & Category */}
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Type</label>
          <select
            name="type"
            value={type}
            onChange={(e) => settype(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          >
            <option value="">Select Type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">Select Category</option>
            <option value="Transfer">Transfer</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
            <option value="Transport">Transport</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      {/* Date */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Optional description..."
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition"
        >
          Add Transaction
        </button>
      </div>

    </form>
  </div>
</div>
  )
}

export default Page
