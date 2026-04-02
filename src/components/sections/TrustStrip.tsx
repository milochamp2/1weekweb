"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, Building2, Zap } from "lucide-react";
import { trustPoints } from "@/data/content";

const icons: Record<string, React.FC<{ className?: string }>> = {
  Clock,
  TrendingUp,
  Building2,
  Zap,
};

export default function TrustStrip() {
  return (
    <section className="relative border-y border-white/[0.06] bg-zinc-900/40 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 sm:divide-x sm:divide-white/[0.08]">
          {trustPoints.map((point, i) => {
            const Icon = icons[point.icon];
            return (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-2.5 px-6 sm:px-8 py-1"
              >
                <Icon className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span className="text-sm font-medium text-zinc-300">
                  {point.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
