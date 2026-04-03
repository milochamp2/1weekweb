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
    <section className="relative border-y border-gray-200 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0 divide-y divide-gray-200 sm:divide-y-0 sm:divide-x sm:divide-gray-200">
          {trustPoints.map((point, i) => {
            const Icon = icons[point.icon];
            return (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-2.5 px-7 sm:px-10 py-3 w-full sm:w-auto justify-center sm:justify-start"
              >
                <Icon className="w-3.5 h-3.5 text-fuchsia-500 shrink-0" />
                <span className="text-xs font-semibold text-gray-600 tracking-wide">
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
