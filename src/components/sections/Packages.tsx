"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { packages } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Packages() {
  return (
    <section id="packages" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background glow for highlighted card */}
      <div
        className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,70,239,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 max-w-xl mx-auto"
        >
          <span className="inline-block text-fuchsia-400 text-sm font-medium mb-4 tracking-wide uppercase">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Simple packages.{" "}
            <span className="text-fuchsia-400">Clear outcomes.</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            No hidden fees. No scope creep. Just a website that works.
          </p>
        </motion.div>

        {/* Package cards */}
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl p-7 flex flex-col border transition-all duration-300",
                pkg.highlighted
                  ? "bg-zinc-900 border-fuchsia-500/40"
                  : "bg-zinc-900 border-white/[0.07] hover:border-white/[0.14]"
              )}
              style={
                pkg.highlighted
                  ? { boxShadow: "0 0 50px -10px rgba(217,70,239,0.25)" }
                  : {}
              }
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-fuchsia-500 text-white text-xs font-semibold shadow-lg shadow-fuchsia-500/30">
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Package name and price */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <h3
                    className={cn(
                      "text-lg font-bold",
                      pkg.highlighted ? "text-white" : "text-zinc-200"
                    )}
                  >
                    {pkg.name}
                  </h3>
                  <span className="text-zinc-500 text-xs">{pkg.period}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span
                    className={cn(
                      "text-4xl font-bold tracking-tight",
                      pkg.highlighted ? "text-white" : "text-white"
                    )}
                  >
                    {pkg.price}
                  </span>
                </div>
                <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Divider */}
              <div
                className={cn(
                  "h-px mb-6",
                  pkg.highlighted ? "bg-fuchsia-500/20" : "bg-white/[0.06]"
                )}
              />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-7">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                        pkg.highlighted
                          ? "bg-fuchsia-500/15 text-fuchsia-400"
                          : "bg-zinc-800 text-zinc-400"
                      )}
                    >
                      <Check className="w-3 h-3" strokeWidth={2.5} />
                    </span>
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-200 group",
                  pkg.highlighted
                    ? "bg-fuchsia-500 hover:bg-fuchsia-400 text-white shadow-lg shadow-fuchsia-500/25"
                    : "bg-white/[0.06] hover:bg-white/[0.11] text-white border border-white/[0.10]"
                )}
              >
                {pkg.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
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
            className="text-zinc-400 hover:text-fuchsia-400 underline underline-offset-4 transition-colors"
          >
            See FAQs
          </a>
        </motion.p>
      </div>
    </section>
  );
}
