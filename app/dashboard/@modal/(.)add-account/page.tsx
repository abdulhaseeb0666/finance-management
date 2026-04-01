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

        router.back();
    }


    return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => router.back()}
      />

      {/* Modal */}
      <div className="relative bg-white w-96 p-6 rounded-2xl shadow-xl z-10">
        <h2 className="text-2xl font-semibold mb-4">Add Account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Account Name */}
          <input
            type="text"
            placeholder="Account Name"
            value={accountname}
            onChange={(e) => setaccountname(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Account Type */}
          <select
            value={accounttype}
            onChange={(e) => setaccounttype(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Account Type</option>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
            <option value="credit">Credit</option>
          </select>

          {error && <p className="text-red-500">{error}</p>}

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-400 text-white py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
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
