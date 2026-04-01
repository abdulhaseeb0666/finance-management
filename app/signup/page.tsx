"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {User} from "../context/FinanceContext";


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

  console.log(localData)

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

    console.log(localData)

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Start managing your finances today
        </p>

        {
            error && <p className="text-red-500 text-center -mt-5 mb-2">{error}</p>
        }

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setemail(e.target.value)}
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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {signup}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-indigo-600 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}