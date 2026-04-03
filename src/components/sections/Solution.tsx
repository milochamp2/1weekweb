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
      className="py-24 sm:py-32 relative overflow-hidden bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="section-label">Our Approach</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Built for speed.
            <br className="hidden sm:block" /> Structured for conversions.
          </h2>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
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
                className="group relative rounded-2xl bg-white border border-gray-200 p-7 transition-all duration-300 hover:border-fuchsia-200 hover:shadow-lg"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
              >
                <div className="w-11 h-11 rounded-xl bg-fuchsia-50 border border-fuchsia-200 flex items-center justify-center mb-6 group-hover:bg-fuchsia-100 transition-all duration-300">
                  <Icon className="w-5 h-5 text-fuchsia-500" />
                </div>
                <h3 className="text-gray-900 font-semibold text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
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
