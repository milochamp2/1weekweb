"use client";

import { motion } from "framer-motion";
import { Zap, Search, TrendingUp, MessageSquare, PenLine } from "lucide-react";
import { addons } from "@/data/content";

const icons: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  Search,
  TrendingUp,
  MessageSquare,
  PenLine,
};

export default function Addons() {
  return (
    <section className="py-24 sm:py-32 bg-zinc-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 max-w-xl mx-auto"
        >
          <span className="section-label">Add-Ons</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Enhance your website performance
          </h2>
          <p className="mt-4 text-zinc-400">
            Stack on what you need. Add any of these to either package.
          </p>
        </motion.div>

        {/* Add-on cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {addons.map((addon, i) => {
            const Icon = icons[addon.icon];
            return (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl bg-zinc-800/70 border border-white/[0.09] hover:border-fuchsia-500/30 p-5 flex flex-col gap-4 cursor-default transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center group-hover:bg-fuchsia-500/15 transition-colors">
                  <Icon className="w-5 h-5 text-fuchsia-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {addon.name}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {addon.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-800 text-fuchsia-400 text-xs font-medium border border-white/[0.06]">
                    {addon.price}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-fuchsia-400 text-sm transition-colors"
          >
            Not sure which add-ons you need?{" "}
            <span className="underline underline-offset-4">
              Let&apos;s talk through it.
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
