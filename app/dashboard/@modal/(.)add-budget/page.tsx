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
    console.log(budget)

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
            router.back();
        }
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

        <div className="absolute inset-0 bg-black/50 z-0 backdrop-blur-sm"
            onClick={() => {router.back()}}    
        />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add Budget</h2>
          <button onClick={() => {router.back()}} className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer">
            <X size={20}/>
          </button>
        </div>

        {
            error && <p className="text-red-500 mb-4">{error}</p>
        }

        {/* Form */}
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
            {/* Category */}
            <div>
                <label className="text-sm text-gray-600">Category</label>
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                    <option value="">Select Category</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Transport">Transport</option>
                    <option value="Others">Others</option>
                </select>
            </div>

            {/* Limit */}
            <div>
                <label className="text-sm text-gray-600">Budget Limit</label>
                <input
                type="number"
                placeholder="Enter limit"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Spendings */}
            <div>
                <label className="text-sm text-gray-600">Current Spendings</label>
                <input
                type="number"
                placeholder="Enter spendings"
                value={spendings}
                onChange={(e) => setSpendings(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
            <button
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                onClick={() => {
                    router.back();
                }}
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
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
