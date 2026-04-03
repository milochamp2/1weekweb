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
    <section className="py-24 sm:py-32 relative overflow-hidden bg-white">
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

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem, i) => {
            const Icon = icons[problem.icon];
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="group rounded-2xl bg-white border border-gray-200 p-6 hover:border-red-200 hover:shadow-md transition-all duration-250"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
              >
                <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center mb-5 group-hover:bg-red-100 transition-colors">
                  <Icon className="w-4 h-4 text-red-500" />
                </div>
                <h3 className="text-gray-900 font-semibold text-[15px] mb-2">
                  {problem.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}

          {/* 6th cell — bridge to solution */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: problems.length * 0.06 }}
            className="hidden lg:flex flex-col items-start justify-between rounded-2xl border border-dashed border-gray-300 p-6"
          >
            <p className="text-gray-500 text-sm leading-relaxed">
              Sound familiar? You&apos;re not alone — these are the most common
              issues we fix.
            </p>
            <a
              href="#solution"
              className="mt-4 inline-flex items-center gap-1.5 text-fuchsia-500 hover:text-fuchsia-600 text-sm font-medium transition-colors"
            >
              See how we fix it →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
