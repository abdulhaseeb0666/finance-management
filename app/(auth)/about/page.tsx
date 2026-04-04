"use client";

import { motion } from "framer-motion";
import { Landmark, ShieldCheck, LineChart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-black via-gray-900 to-gray-950 text-white px-6 md:px-16 py-16 space-y-24">
      
      {/* HERO */}
      <section className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="p-4 rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
            <Landmark size={40} />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          About Monetra
        </h1>

        <p className="max-w-2xl mx-auto text-gray-400 text-lg">
          Monetra is a next-generation financial intelligence platform designed to
          simplify money management, empower decision-making, and deliver
          high-performance insights with elegance and precision.
        </p>
      </section>

      {/* MISSION */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            We aim to redefine how individuals and businesses interact with
            financial data. Monetra transforms complex financial workflows into
            intuitive, real-time experiences—bridging the gap between data and
            clarity.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <LineChart className="text-indigo-400 mb-4" size={40} />
          <p className="text-gray-300">
            Real-time analytics, intelligent insights, and seamless UI — all in
            one ecosystem.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Why Monetra?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition-all">
            <ShieldCheck className="text-green-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Secure by Design</h3>
            <p className="text-gray-400 text-sm">
              Enterprise-grade security ensuring your financial data remains
              protected at all times.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition-all">
            <Sparkles className="text-pink-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Beautiful UI</h3>
            <p className="text-gray-400 text-sm">
              A premium interface crafted for clarity, speed, and seamless
              interaction.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition-all">
            <LineChart className="text-indigo-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Smart Insights</h3>
            <p className="text-gray-400 text-sm">
              Advanced analytics to help you track, predict, and optimize your
              finances effortlessly.
            </p>
          </div>

        </div>
      </section>

      {/* VISION */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Our Vision</h2>
        <p className="text-gray-400 leading-relaxed">
          To become the most trusted financial platform globally by combining
          cutting-edge technology with human-centric design. We envision a world
          where financial clarity is accessible to everyone.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Link href="/signup">
        <div className="inline-block px-10 py-6 rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl hover:scale-105 transition-all">
          <h3 className="text-2xl font-bold mb-2">Start Your Journey</h3>
          <p className="text-sm text-gray-200">
            Experience the future of finance with Monetra.
          </p>
        </div>
        </Link>
      </section>

    </main>
  );
}
