"use client";

import { useSearchParams } from "next/navigation"
import type { FinanceContextType , User} from "../context/FinanceContext"
import { useEffect, useState } from "react";
import { Trash } from 'lucide-react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import SpendingPieChart from "../components/(real)/SpendingPieChart";

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
    const insigts = user?.insights;

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
    <div className="min-h-screen bg-[#0B0F19] text-white flex">

      {/* SIDEBAR (NEW) */}
      <aside className="hidden md:flex flex-col w-64 p-6 border-r border-white/10 bg-white/5 backdrop-blur-xl">
        <h1 className="text-2xl font-bold mb-10">FinanceAI</h1>

        <nav className="flex flex-col gap-4 text-gray-400">
          <span className="text-white font-medium">Dashboard</span>
          <span className="hover:text-white cursor-pointer">Accounts</span>
          <span className="hover:text-white cursor-pointer">Transactions</span>
          <span className="hover:text-white cursor-pointer">Budgets</span>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <h1 className="text-xl font-semibold">
            Welcome back, <span className="text-indigo-400">{name}</span> 👋
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("login");
              router.push("/");
            }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <main className="p-6 space-y-6">

          {/* ACCOUNTS */}
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Accounts</h2>
              <button
                onClick={addAccount}
                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition"
              >
                + Add
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                accounts?.length === 0 ? <h2 className="text-gray-400">No accounts found.</h2> :
                  accounts?.map((acc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition"
                >
                  <div>
                    <h3 className="font-medium">{acc.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {acc.balance.toLocaleString()} {user?.currency}
                    </p>
                  </div>

                  <Trash
                    className="cursor-pointer hover:text-red-400"
                    onClick={() => deleteAccount(acc.id)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* TRANSACTIONS */}
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <button
                onClick={addTransaction}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600"
              >
                + Add
              </button>
            </div>

            <div className="space-y-3">
              {
                transactions?.length === 0 ? <h2 className="text-gray-400">No transactions found.</h2> :
                transactions?.slice(-5).map((txn, idx) => (
                <div
                  key={idx}
                  className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div>
                    <p>{txn.category}</p>
                    <span className="text-sm text-gray-400">{txn.date}</span>
                  </div>

                  <p className={txn.type === "income" ? "text-green-400" : "text-red-400"}>
                    {txn.type === "income" ? "+" : "-"}
                    {txn.amount}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <Link href={`/dashboard/all-transactions?name=${name}&email=${email}`}>
                <button className="text-indigo-400 hover:underline">
                  View All →
                </button>
              </Link>
            </div>
          </section>

          {/* Budget Section */}
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Budgets</h2>

              <Link href={`/dashboard/add-budget?name=${name}&email=${email}`}>
                <button className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition">
                  + Add Budget
                </button>
              </Link>
            </div>

            {user?.budgets.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No budgets found. Start by adding one.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {user?.budgets.map((budget, idx) => {
                  const percentage = (budget.spent / budget.limit) * 100;
                  const remaining = budget.limit - budget.spent;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
                    >
                      {/* Top */}
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{budget.category}</h3>

                        <Trash
                          className="cursor-pointer hover:text-red-400"
                          onClick={() => deleteBudget(budget.category)}
                        />
                      </div>

                      {/* Numbers */}
                      <div className="text-sm text-gray-400">
                        <p>
                          {budget.spent.toLocaleString()} / {budget.limit.toLocaleString()} {user?.currency}
                        </p>
                        <p className={remaining < 0 ? "text-red-400" : "text-gray-400"}>
                          Remaining: {remaining.toLocaleString()} {user?.currency}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            percentage > 100
                              ? "bg-red-500"
                              : percentage > 75
                              ? "bg-yellow-400"
                              : "bg-emerald-400"
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* BOTTOM GRID */}
          <section className="flex flex-col xl:flex-row justify-between gap-10">

            {/* INSIGHTS CARD */}
            <div className="p-6 w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:scale-[1.02] transition-transform">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Insights</h3>
                {insigts?.some(i => i.type === "Budget Alert") && (
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                    Alerts
                  </span>
                )}
              </div>
              {insigts?.slice(-5).length === 0 ? (
                <p className="text-gray-400 text-sm">No insights found. Add a transaction to see insights.</p>
              ) : (
                <ul className="space-y-2 text-gray-300 text-sm">
                  {insigts?.slice(-5).map((i, idx) => (
                    <li key={idx} className={`${i.type === "Budget Alert" ? "text-red-400 font-medium" : ""}`}>
                      • {i.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* SPENDING PIE CHART CARD */}
            <div className="p-6 w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:scale-[1.02] transition-transform flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-4">Spending Breakdown</h3>
              <div className="w-full h-64 flex justify-center items-center">
                <SpendingPieChart name={String(name)} email={String(email)} />
              </div>
              <p className="mt-4 flex items-center justify-center text-gray-400 text-sm text-center">
                Visual representation of your spending by category.
              </p>
            </div>

          </section>

        </main>
      </div>
    </div>
  )
}

export default DashboardContent
