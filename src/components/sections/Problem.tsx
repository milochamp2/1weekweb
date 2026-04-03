"use client";

import { motion } from "framer-motion";
import { AlertTriangle, MessageCircleX, TrendingDown } from "lucide-react";
import { problems } from "@/data/content";

const icons: Record<string, React.FC<{ className?: string }>> = {
  AlertTriangle,
  MessageCircleX,
  TrendingDown,
};

export default function Problem() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="section-label">The Problem</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Most websites look fine —
            <br className="hidden sm:block" />
            but don&apos;t bring in leads
          </h2>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Looking good and performing well are two different things. Most
            businesses are missing the second part.
          </p>
        </motion.div>

        {/* Problem cards — 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {problems.map((problem, i) => {
            const Icon = icons[problem.icon];
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="group rounded-2xl bg-white border border-gray-200 p-7 hover:border-red-200 hover:shadow-md transition-all duration-250"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: "#fff0ef", border: "1px solid #f8cac8" }}
                >
                  <Icon className="w-5 h-5 text-[#C4453C]" />
                </div>
                <h3 className="text-gray-900 font-semibold text-[15px] mb-2 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bridge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400 text-sm">
            Sound familiar?{" "}
            <a
              href="#solution"
              className="text-fuchsia-500 hover:text-fuchsia-600 font-medium transition-colors"
            >
              See how we fix it →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
