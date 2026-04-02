"use client";

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      {/* Overlay */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm"
        onClick={() => router.back()}
      />

      {/* Modal */}
      <div className="relative bg-white w-105 p-6 rounded-2xl shadow-xl z-10">
        
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4">
          Add Transaction
        </h2>

        {
            error && <p className="text-red-500 mb-4">{error}</p>
        }

        {/* Form */}
        <form onSubmit={(e) => {
                handleSubmit(e)
            }} className="flex flex-col gap-4">
          
          {/* Account */}
          <select
            name="account"
            value={account}
            onChange={(e) => setaccount(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Account</option>
            {user?.accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>

          {/* Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setamount(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Type */}
          <select
            name="type"
            value={type}
            onChange={(e) => settype(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          {/* Category */}
          <select
            name="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="Transfer">Transfer</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
            <option value="Transport">Transport</option>
            <option value="Others">Others</option>
          </select>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Optional description..."
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="border p-3 rounded-lg resize-none"
            rows={3}
          />

          {/* Buttons */}
          <div className="flex justify-between gap-3 mt-2">
            
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full bg-gray-400 text-white py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Add
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
