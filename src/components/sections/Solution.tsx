"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Target, ListChecks } from "lucide-react";
import { solutionValues } from "@/data/content";

const icons: Record<string, React.FC<{ className?: string }>> = {
  Rocket,
  Target,
  ListChecks,
};

function StatBadge({ stat, label }: { stat: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`mt-5 pt-5 border-t border-white/10 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <p className="text-fuchsia-400 font-black text-2xl tracking-tight leading-none">
        {stat}
      </p>
      <p className="text-gray-500 text-xs mt-1 leading-snug">{label}</p>
    </div>
  );
}

export default function Solution() {
  return (
    <section
      id="solution"
      className="py-16 sm:py-24 relative overflow-hidden bg-gray-900"
    >
      {/* Top divider */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="section-label section-label-light">Our Approach</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Built for speed.
            <br className="hidden sm:block" /> Structured for conversions.
          </h2>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
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
                className="group relative rounded-2xl bg-white/5 border border-white/10 p-7 transition-all duration-300 hover:border-fuchsia-500/30 hover:bg-white/[0.07]"
              >
                <div className="w-11 h-11 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center mb-6 group-hover:bg-fuchsia-500/20 transition-all duration-300">
                  <Icon className="w-5 h-5 text-fuchsia-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
                <StatBadge stat={value.stat} label={value.statLabel} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
