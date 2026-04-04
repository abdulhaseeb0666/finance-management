"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {User} from "../../context/FinanceContext";
import {motion} from "framer-motion"

export default function SignupPage() {

  const router = useRouter();

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [signup, setsignup] = useState("Sign Up")
  const [error, seterror] = useState("")
  
  const [localData, setlocalData] = useState(
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("realData") || "null")
  );


  function handleSubmit(e : React.SubmitEvent<HTMLFormElement>) : void {
    e.preventDefault();

    if(!name || !email || !password){
        seterror("Please fill all the fields")
        return
    }
    if(password !== confirmPassword) {
      seterror("Passwords do not match");
      return;
    }

    const users = localData?.users || [];

    const userExists = users.some(
      (user: User) => user.name?.toLowerCase() === name.toLowerCase()
    );
    const emailExists = users.some(
      (user: User) => user.email?.toLowerCase() == email.toLowerCase()
    );

    if (userExists && emailExists) {
      seterror("Username and email already exist!");
      return;
    }
    if (userExists) {
      seterror("Username already exists!");
      return;
    }
    if (emailExists) {
      seterror("Email already exists!");
      return;
    }

    setsignup("Signing Up...")


    setTimeout(() => {
      router.push(`/newsignup?name=${name}&email=${email}&password=${password}`)
        seterror("")
        setname("")
        setemail("")
        setpassword("")
        setconfirmPassword("")
    }, 2000);
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#0B0F19] text-white">

      {/* LEFT SIDE (BRANDING) */}
      <div className="hidden md:flex flex-col justify-center items-center relative overflow-hidden">

        {/* Glow Background */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 blur-3xl" />

        {/* ✨ Gradient Fade to Right */}
        <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-r from-transparent to-[#0B0F19]" />

        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Join the Future of <br />
            <span className="text-indigo-400">Finance</span>
          </h1>

          <p className="text-gray-300">
            Smart insights, powerful analytics, and total control over your money.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex items-center justify-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl"
        >

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Start managing your finances today
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-center mb-4">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full p-3 rounded-xl bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full p-3 rounded-xl bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition hover:scale-105 font-semibold shadow-lg shadow-indigo-500/30"
            >
              {signup}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-indigo-400 cursor-pointer font-medium hover:underline"
            >
              Login
            </span>
          </p>

        </motion.div>
      </div>
    </div>
  );
}