"use client";

import type { FinanceContextType } from '@/app/context/FinanceContext';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from "react";

const Page = () => {

    const router = useRouter()

    const searchparams = useSearchParams()
    const name = searchparams.get("name")
    const email = searchparams.get("email")

    const [accountname, setaccountname] = useState("")
    const [accounttype, setaccounttype] = useState("")
    const [error, seterror] = useState("")

    const [data, setdata] = useState<FinanceContextType>(
        localStorage && JSON.parse(localStorage.getItem("realData") || "null")
    )
    const [user, setuser] = useState(data?.users.find((user) => user.name === name && user.email === email) || null)

    function handleSubmit(e : React.FormEvent) {
        
        e.preventDefault();

        seterror("")

        if (!accountname || !accounttype) {
            seterror("Please fill in all fields.");
            return;
        }

        if (user) {
            const data: FinanceContextType | null = JSON.parse(localStorage.getItem("realData") || "null");
            if (data) {
                const userIndex = data.users.findIndex(
                    (u) => u.name === name && u.email === email
                );
                if (userIndex !== -1) {
                    const newAccount = {
                        id: `acc_00${data.users[userIndex].accounts.length+1}`,
                        name: accountname,
                        type: accounttype,
                        balance: 0,
                    };
                    data.users[userIndex].accounts.push(newAccount);
                    localStorage.setItem("realData", JSON.stringify(data));
                    setuser(data.users[userIndex]);
                }
            }
        }
        alert("Reload Page to see the new account added.");
        router.back();
    }


    return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
    onClick={() => router.back()}
  />

  {/* Modal */}
  <div className="relative bg-white/90 backdrop-blur-md w-96 p-8 rounded-3xl shadow-2xl z-10 animate-fadeIn">
    <h2 className="text-2xl font-bold text-center mb-6">Add Account</h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Account Name */}
      <input
        type="text"
        placeholder="Account Name"
        value={accountname}
        onChange={(e) => setaccountname(e.target.value)}
        className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition"
        required
      />

      {/* Account Type */}
      <select
        value={accounttype}
        onChange={(e) => setaccounttype(e.target.value)}
        className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition"
        required
      >
        <option value="">Select Account Type</option>
        <option value="checking">Checking</option>
        <option value="savings">Savings</option>
        <option value="credit">Credit</option>
      </select>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 py-3 rounded-xl bg-gray-300 text-gray-700 font-medium hover:bg-gray-400 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Add Account
        </button>
      </div>

    </form>
  </div>
</div>
  )
}

export default Page
