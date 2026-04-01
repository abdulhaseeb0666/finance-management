"use client";

import { useSearchParams } from "next/navigation"
import type { FinanceContextType , User} from "../context/FinanceContext"
import { useEffect, useState } from "react";
import { Trash } from 'lucide-react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const DashboardContent = () => {
  
  const searchParams = useSearchParams()
  
  const name = searchParams.get("name")
  const email = searchParams.get("email")

  useEffect(() => {
    const name = searchParams.get("name")
    const email = searchParams.get("email")
      if(name && email){
    localStorage.setItem("login" , JSON.stringify({name , email}))
      }
  }, [searchParams])
  
    const router = useRouter()
    const [user, setuser] = useState<User | null>(null)
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        if(typeof localStorage !== "undefined") {
            const data : FinanceContextType | null = JSON.parse(localStorage.getItem("realData") || "null");
            if (data) {
                const foundUser = data.users.find(
                    (user) => user.name === name && user.email === email
                ) || null;
                setuser(foundUser);
            }
            
        }
    }, [name , email])
    
    if (!mounted) {
        return null; // or a loading spinner
    }

    const accounts = user?.accounts;
    const transactions = user?.transactions;

    function addAccount() {
        router.push("/dashboard/add-account?name=" + name + "&email=" + email);
    }

    function deleteAccount(accountId: string) {
      
      const accountIdToDelete = accountId

      if (user) {
        const data: FinanceContextType | null = JSON.parse(localStorage.getItem("realData") || "null");
        if (data) {
          const userIndex = data.users.findIndex(
            (u) => u.name === name && u.email === email
          );
          if (userIndex !== -1) {
            data.users[userIndex].accounts = data.users[userIndex].accounts.filter(
              (acc) => acc.id !== accountIdToDelete
            );
            localStorage.setItem("realData", JSON.stringify(data));
            setuser(data.users[userIndex]);
          }
        }
      }
    }

    function addTransaction() {
      router.push("/dashboard/add-transaction?name=" + name + "&email=" + email);
    }
    
    function deleteBudget(category: string) {
      const categoryToDelete = category;

      if (user) {
        const data: FinanceContextType | null = JSON.parse(localStorage.getItem("realData") || "null");
        if (data) {
          const userIndex = data.users.findIndex(
            (u) => u.name === name && u.email === email
          );
          if (userIndex !== -1) {
            data.users[userIndex].budgets = data.users[userIndex].budgets.filter(
              (budget) => budget.category !== categoryToDelete
            );
            localStorage.setItem("realData", JSON.stringify(data));
            setuser(data.users[userIndex]);
          }
        }
      }
    }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Welcome, {name}!</h1>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer">
            Profile
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem("login");
              router.push("/")
            }} 
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Accounts Section */}
        <section className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Accounts</h2>
            <button
              onClick={addAccount}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Account
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              accounts?.length === 0 && (
                <p className="text-gray-500 text-center col-span-full">
                  No accounts found. Please add an account.
                </p>
              )
            }
            {
            accounts?.map((acc, idx) => (
              <div
                key={idx}
                className="p-4 rounded shadow bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{acc?.name}</h3>
                  <p className="text-gray-600">
                    Balance: {acc.balance.toLocaleString()} {user?.currency}
                  </p>
                </div>
                <button 
                  id={acc.id}
                  onClick={() => {
                    deleteAccount(acc.id)
                  }}
                  className=" text-white  rounded-full h-fit w-fitflex justify-center items-center hover:cursor-pointer">
                <Trash size={24} color="black" strokeWidth={2}  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Transactions Section */}
        <section className="bg-white p-6 rounded shadow flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <button 
              onClick={() => {
                addTransaction();
              }}
              className="bg-emerald-600 px-5 py-2 text-white text-sm font-bold rounded-xl hover:cursor-pointer">Add Transaction</button>
          </div>
          {transactions?.length === 0 ? (
              <p className="text-gray-500 text-center">
                No transactions found. Please add a transaction.
              </p>
            ) : (
              <>
                <div className="overflow-x-auto rounded-2xl">
                  <table className="w-full text-left border-bs-zinc-950">
                    <thead>
                      <tr className="bg-gray-300">
                        <th className="p-2">Date</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Description</th>
                        <th className="p-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        transactions?.slice(transactions.length - 5 , transactions.length).map((txn, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="p-2">{txn.date}</td>
                            <td className="p-2">{txn.category}</td>
                            <td className="p-2">{txn.description}</td>
                            {
                              txn.type === "income" ? (
                                <td className="p-2 text-green-600 text-right">+{txn.amount.toLocaleString()} {user?.currency}</td>
                              ) : (
                                <td className="p-2 text-red-600 text-right">-{txn.amount.toLocaleString()} {user?.currency}</td>
                              )
                            }
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <div className="w-full flex justify-end">
                  <Link href={`/dashboard/all-transactions?name=${name}&email=${email}`}>
                    <button type="button" 
                      className="bg-blue-600 px-2 py-1 rounded-xl text-white font-medium hover:bg-blue-700 hover:cursor-pointer"
                    >
                      View All Transactions
                    </button>
                  </Link>
                </div>
              </>
          )}
        </section>

        {/* Budget Section */}
        <section className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Budget</h2>
          <Link href={`/dashboard/add-budget?name=${name}&email=${email}`}>
            <button 
              type="button" 
              className="bg-emerald-600 px-5 py-2 text-white text-sm font-bold rounded-xl hover:cursor-pointer"
            >
              Add Budget
            </button>
          </Link>
          </div>
          <div className="flex flex-col rounded-2xl overflow-x-auto">
            {
              user?.budgets.length === 0 ? (
                <p className="text-gray-500">No budgets found. Please add a budget.</p>
              ) : (
                <table>
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="p-2 text-left">Category</th>
                      <th className="p-2 text-left">Limit</th>
                      <th className="p-2 text-left">Spent</th>
                      <th className="p-2 text-left">Remaining</th>
                      <th className="p-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      user?.budgets.map((budget , idx) => {
                        return (
                          <tr key={idx} className="border-b">
                            <td className="p-2">{budget.category}</td>
                            <td className="p-2">{budget.limit.toLocaleString()} {user?.currency}</td>
                            <td className="p-2">{budget.spent.toLocaleString()} {user?.currency}</td>
                            <td className="p-2">{(budget.limit - budget.spent).toLocaleString()} {user?.currency}</td>
                            <td className="p-2 flex justify-end"> <Trash size={24} color="black" strokeWidth={2} className="hover:cursor-pointer" onClick={() => deleteBudget(budget.category)} /> </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              )
            }
          </div>
        </section>

        {/* Insights / Monthly Summary / Spendings */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold mb-2">Insights</h3>
            <p className="text-gray-600">You spent 40% on groceries this month.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold mb-2">Monthly Summary</h3>
            <p className="text-gray-600">Total income: $5,000, Total spending: $2,345</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold mb-2">Spendings</h3>
            <p className="text-gray-600">Top categories: Groceries, Entertainment, Transport</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardContent
