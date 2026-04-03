"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";
import type {FinanceContextType} from "../context/FinanceContext"
import { motion } from "framer-motion"

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
    <div className="min-h-screen grid md:grid-cols-2 bg-[#0B0F19] text-white">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 blur-3xl" />

        {/* Smooth Edge Blend */}
        <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-r from-transparent to-[#0B0F19]" />

        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome Back 👋
          </h1>

          <p className="text-gray-300">
            Log in to continue managing your finances with powerful insights.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6 bg-linear-to-l from-[#0B0F19] via-[#0B0F19]/90 to-transparent">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl"
        >

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mb-2">
            Login
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Start managing your finances today
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-center mb-4">{error}</p>
          )}

          {/* Form */}
          <form className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full p-3 rounded-xl bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={loginHandler}
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition hover:scale-105 font-semibold shadow-lg shadow-indigo-500/30"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-indigo-400 cursor-pointer font-medium hover:underline"
            >
              Sign Up
            </span>
          </p>

        </motion.div>
      </div>
    </div>
  )
}

export default Page
