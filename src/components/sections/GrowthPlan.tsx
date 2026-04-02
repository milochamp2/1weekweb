"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { growthPlans } from "@/data/content";
import { cn } from "@/lib/utils";

export default function GrowthPlan() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
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
          className="text-center mb-5 max-w-2xl mx-auto"
        >
          <span className="inline-block text-fuchsia-400 text-sm font-medium mb-4 tracking-wide uppercase">
            Ongoing Support
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Keep your website improving after launch
          </h2>
          <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
            Ongoing support, updates, and optimisation for businesses that want
            more than just a one-time build.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mt-12">
          {growthPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl p-7 flex flex-col border transition-all duration-300",
                plan.highlighted
                  ? "bg-zinc-900 border-fuchsia-500/40"
                  : "bg-zinc-900/60 border-white/[0.06] hover:border-white/[0.12]"
              )}
              style={
                plan.highlighted
                  ? { boxShadow: "0 0 50px -10px rgba(217,70,239,0.2)" }
                  : {}
              }
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-fuchsia-500 text-white text-xs font-semibold shadow-lg shadow-fuchsia-500/30">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-5">
                <h3
                  className={cn(
                    "font-bold text-lg mb-1",
                    plan.highlighted ? "text-white" : "text-zinc-200"
                  )}
                >
                  {plan.name}
                </h3>
                <p className="text-zinc-500 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-zinc-500 text-sm">/{plan.period}</span>
              </div>

              {/* Divider */}
              <div
                className={cn(
                  "h-px mb-6",
                  plan.highlighted ? "bg-fuchsia-500/20" : "bg-white/[0.06]"
                )}
              />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0",
                        plan.highlighted
                          ? "text-fuchsia-400"
                          : "text-zinc-500"
                      )}
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-sm transition-all duration-200 group",
                  plan.highlighted
                    ? "bg-fuchsia-500 hover:bg-fuchsia-400 text-white shadow-lg shadow-fuchsia-500/25"
                    : "bg-white/[0.05] hover:bg-white/[0.09] text-white border border-white/[0.08]"
                )}
              >
                Get started
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-zinc-600 text-sm mt-8"
        >
          Cancel anytime. No lock-in contracts.
        </motion.p>
      </div>
    </section>
  );
}
