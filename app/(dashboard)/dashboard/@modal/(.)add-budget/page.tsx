"use client";

import { useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FinanceContextType } from "@/app/context/FinanceContext";

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
  
    const name = searchParams.get("name")
    const email = searchParams.get("email")


    const [data, setdata] = useState<FinanceContextType | null>(
            localStorage && JSON.parse(localStorage.getItem("realData") || "null")
        )
    const [user, setuser] = useState(data?.users.find((user) => user.name === name && user.email === email) || null)
    const [budget, setbudget] = useState(user?.budgets || [])

    const [category, setCategory] = useState("")
    const [limit, setLimit] = useState("")
    const [spendings, setSpendings] = useState("")
    const [error, seterror] = useState("")

    function handleSubmit(e : React.FormEvent) {
        e.preventDefault();
        
        seterror("")

        if(!category || !limit || !spendings) {
            seterror("Please fill all the fields");
            return;
        }

        let budgetExists = false;
        
        budget.forEach((b) => { 
            if(b.category === category) {
                seterror("Budget for this category already exists");
                budgetExists = true;
                return;
            }
        });

        if(budgetExists) return;

        const newBudget = {
            category: category,
            limit: Number(limit),
            spent: Number(spendings),
        }

        if(user){
            data?.users.forEach((u) => {
                if(u.name === user.name && u.email === user.email){
                    u.budgets.push(newBudget)
                }
            });
            localStorage.setItem("realData", JSON.stringify(data));
            alert("Reload Page to see the new budget added.");
            router.back();
        }
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
      <h2 className="text-2xl font-bold text-gray-800">Add Budget</h2>
      <button
        onClick={() => router.back()}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <X size={22} />
      </button>
    </div>

    {/* Error Message */}
    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Category */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="">Select Category</option>
          <option value="Transfer">Transfer</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Budget Limit */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Budget Limit</label>
        <input
          type="number"
          placeholder="Enter limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Current Spendings */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Current Spendings</label>
        <input
          type="number"
          placeholder="Enter spendings"
          value={spendings}
          onChange={(e) => setSpendings(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition"
        >
          Save Budget
        </button>
      </div>

    </form>
  </div>
</div>
  )
}

export default Page
