"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { packages } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Packages() {
  return (
    <section id="packages" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 max-w-xl mx-auto"
        >
          <span className="section-label">Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Simple packages.{" "}
            <span className="text-fuchsia-400">Clear outcomes.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base">
            No hidden fees. No scope creep. Just a website that works.
          </p>
        </motion.div>

        {/* Package cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-5 max-w-3xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={cn(
                "relative rounded-2xl flex flex-col overflow-hidden",
                pkg.highlighted
                  ? "border border-fuchsia-500/40"
                  : "border border-white/[0.06] bg-zinc-900/60"
              )}
              style={
                pkg.highlighted
                  ? {
                      background:
                        "linear-gradient(160deg, rgba(217,70,239,0.08) 0%, rgb(24,24,27) 35%)",
                      boxShadow:
                        "0 0 0 1px rgba(217,70,239,0.2), 0 24px 80px -20px rgba(217,70,239,0.35)",
                    }
                  : {}
              }
            >
              {/* Growth: top accent bar */}
              {pkg.highlighted && (
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(217,70,239,0.8), transparent)",
                  }}
                />
              )}

              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-fuchsia-500 text-white text-[11px] font-bold tracking-widest uppercase shadow-lg shadow-fuchsia-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Name + period */}
                <div className="flex items-center justify-between mb-1">
                  <h3
                    className={cn(
                      "font-bold text-xl",
                      pkg.highlighted ? "text-white" : "text-zinc-300"
                    )}
                  >
                    {pkg.name}
                  </h3>
                  <span className="text-zinc-600 text-xs font-medium">
                    {pkg.period}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <span
                    className={cn(
                      "font-black tracking-tight leading-none",
                      pkg.highlighted
                        ? "text-5xl text-white"
                        : "text-4xl text-zinc-300"
                    )}
                  >
                    {pkg.price}
                  </span>
                </div>

                {/* Description */}
                <p
                  className={cn(
                    "text-sm leading-relaxed mb-6",
                    pkg.highlighted ? "text-zinc-400" : "text-zinc-500"
                  )}
                >
                  {pkg.description}
                </p>

                {/* Divider */}
                <div
                  className={cn(
                    "h-px mb-6",
                    pkg.highlighted ? "bg-fuchsia-500/20" : "bg-white/[0.05]"
                  )}
                />

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1 mb-7">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px",
                          pkg.highlighted
                            ? "bg-fuchsia-500/20 text-fuchsia-400"
                            : "bg-zinc-800 text-zinc-500"
                        )}
                      >
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span
                        className={cn(
                          "text-sm",
                          pkg.highlighted ? "text-zinc-200" : "text-zinc-400"
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 group",
                    pkg.highlighted
                      ? "bg-fuchsia-500 hover:bg-fuchsia-400 text-white"
                      : "bg-white/[0.05] hover:bg-white/[0.09] text-zinc-300 hover:text-white border border-white/[0.09] hover:border-white/[0.18]"
                  )}
                  style={
                    pkg.highlighted
                      ? { boxShadow: "0 0 24px -4px rgba(217,70,239,0.4)" }
                      : {}
                  }
                >
                  {pkg.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-zinc-600 text-sm mt-8"
        >
          All packages include a free 30-minute discovery call.{" "}
          <a
            href="#faq"
            className="text-zinc-500 hover:text-fuchsia-400 underline underline-offset-4 transition-colors"
          >
            See FAQs →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
