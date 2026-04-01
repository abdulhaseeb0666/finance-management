"use client";

import { useState , useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { FinanceContextType } from "../context/FinanceContext";
import Link from "next/link";

export default function DashboardPage() {
  
  const data = useSearchParams();

  const name = data.get("name")
  const email = data.get("email")
  const password = data.get("password")

   const [localData, setlocalData] = useState<FinanceContextType>(
      typeof localStorage !== "undefined" &&
      JSON.parse(localStorage.getItem("realData") || "null")
    );
  const [error, seterror] = useState("");

  useEffect(() => {
    if(typeof localStorage !== "undefined"){
      localStorage.setItem("realData" , JSON.stringify(localData))
    }
  }, [localData])
  
  const users = localData?.users || [];
  
  useEffect(() => {
    if (!name || !email || !password) return;

    const userExists = users.some(
      (user) => user.name?.toLowerCase() === name?.toLowerCase()
    );
    const emailExists = users.some(
      (user) => user.email?.toLowerCase() == email?.toLowerCase()
    );
    if (userExists || emailExists) {
      seterror("Account already exists , Go To Dashboard");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email , name , password]);

  useEffect(() => {
    if (error) {
      return;
    }
    
    const users = localData?.users || [];

    const userExists = users.some(
      (user) => user.name?.toLowerCase() === name?.toLowerCase()
    );
    const emailExists = users.some(
      (user) => user.email?.toLowerCase() == email?.toLowerCase()
    );
    
    if (!userExists && !emailExists && name && email && password) {
      seterror("");

      setlocalData((prev) => {
        const users = prev?.users || [];

        return {
          ...prev,
          users: [
            ...users,
            {
              id: users.length + 1,
              name: name,
              email: email,
              password: password,
              currency: "USD",
              accounts: [],
              transactions: [],
              monthlySummary: [],
              spendingByCategory: [],
              budgets: [],
              insights: []
            }
          ]
        };
      });
    }
  }, [email , name , password , error , localData]);
  
  setTimeout(() => {
    
  }, 1000);
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {name} 👋
        </h1>

        {/* Subtext */}
          {error ? (
            <p className="text-red-500 mb-6">{error}</p>
          ) : (
            <p className="text-gray-500 mb-6">
              Your account has been successfully created.  
              Let’s start managing your finances smarter.
            </p>
        )}

        {/* Info Box */}
        <div className="bg-gray-100 rounded-xl p-4 text-left mb-6">
          <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {email}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Currency:</span> USD</p>
        </div>

        {/* CTA Button */}
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          <Link href={`/dashboard?name=${name}&email=${email}`}>Go to Dashboard</Link>
        </button>

      </div>
    </div>
  );
}