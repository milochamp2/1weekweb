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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Most websites look fine —
            <br className="hidden sm:block" />
            but don&apos;t bring in leads
          </h2>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            Looking good and performing well are two different things. Most
            businesses are missing the second part.
          </p>
        </motion.div>

        {/* Problem cards — 2 col on sm, 3 col on lg (5 cards fills 3+2 naturally) */}
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
                className="group rounded-2xl bg-zinc-900 border border-white/[0.06] p-6 hover:border-red-500/20 transition-all duration-250"
              >
                <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center mb-5 group-hover:bg-red-500/15 transition-colors">
                  <Icon className="w-4 h-4 text-red-400" />
                </div>
                <h3 className="text-white font-semibold text-[15px] mb-2">
                  {problem.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
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
            className="hidden lg:flex flex-col items-start justify-between rounded-2xl border border-dashed border-white/[0.07] p-6"
          >
            <p className="text-zinc-600 text-sm leading-relaxed">
              Sound familiar? You&apos;re not alone — these are the most common
              issues we fix.
            </p>
            <a
              href="#solution"
              className="mt-4 inline-flex items-center gap-1.5 text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium transition-colors"
            >
              See how we fix it →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
