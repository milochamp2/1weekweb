"use client";

import { motion } from "framer-motion";
import {
  Timer,
  AlertTriangle,
  MessageCircleX,
  MousePointerClick,
  TrendingDown,
} from "lucide-react";
import { problems } from "@/data/content";

const icons: Record<string, React.FC<{ className?: string }>> = {
  Timer,
  AlertTriangle,
  MessageCircleX,
  MousePointerClick,
  TrendingDown,
};

export default function Problem() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="inline-block text-fuchsia-400 text-sm font-medium mb-4 tracking-wide uppercase">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Most websites look fine —<br className="hidden sm:block" />
            but don&apos;t bring in leads
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {problems.map((problem, i) => {
            const Icon = icons[problem.icon];
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl bg-zinc-900 border border-white/[0.07] p-6 hover:border-white/[0.14] transition-all duration-200"
              >
                {/* Red accent top-left corner */}
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {problem.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}

          {/* Spacer card for odd grid alignment */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: problems.length * 0.07 }}
            className="hidden lg:flex rounded-2xl bg-zinc-900/40 border border-dashed border-white/[0.06] p-6 items-center justify-center"
          >
            <p className="text-zinc-600 text-sm text-center leading-relaxed">
              Sound familiar?
              <br />
              <span className="text-fuchsia-500">We can fix that.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
