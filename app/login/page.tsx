"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";
import type {FinanceContextType} from "../context/FinanceContext"

const Page = () => {
    const router = useRouter();

    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [realData, setrealData] = useState<FinanceContextType | null>(
        typeof localStorage !== "undefined" &&
        JSON.parse(localStorage.getItem("realData") || "null")
    );
    const [error, seterror] = useState("");

    
    function loginHandler(e : React.MouseEvent<HTMLButtonElement>) : void {
        e.preventDefault();

        if(!name || !password){
            seterror("Please fill all the fields")
            return
        }

        const user = realData?.users.find(
            (user) => user.name === name && user.password === password
        );

        if (user) {
            router.push(`/dashboard?name=${user.name}&email=${user.email}`);
        } else {
            seterror("Invalid username or password");
        }

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Login
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Start managing your finances today
        </p>

        {error && <p className="text-red-500 text-center -mt-5 mb-3">{error}</p>}


        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={loginHandler}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-indigo-600 cursor-pointer font-medium"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  )
}

export default Page
