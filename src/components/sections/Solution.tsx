"use client";

import { motion } from "framer-motion";
import { Rocket, Target, ListChecks } from "lucide-react";
import { solutionValues } from "@/data/content";

const icons: Record<string, React.FC<{ className?: string }>> = {
  Rocket,
  Target,
  ListChecks,
};

export default function Solution() {
  return (
    <section
      id="solution"
      className="py-24 sm:py-32 bg-zinc-900/30 relative overflow-hidden"
    >
      {/* Fuchsia glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,70,239,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="inline-block text-fuchsia-400 text-sm font-medium mb-4 tracking-wide uppercase">
            Our Approach
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Built for speed.
            <br className="hidden sm:block" />
            Structured for conversions.
          </h2>
          <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
            We build websites that generate leads — not just look good.
          </p>
        </motion.div>

        {/* Value cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {solutionValues.map((value, i) => {
            const Icon = icons[value.icon];
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl bg-zinc-900 border border-white/[0.07] p-7 hover:border-fuchsia-500/30 transition-all duration-300"
                style={{
                  boxShadow: "0 0 0 0 rgba(217,70,239,0)",
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: "0 0 40px -8px rgba(217,70,239,0.15)",
                  }}
                />

                <div className="w-11 h-11 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-fuchsia-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
