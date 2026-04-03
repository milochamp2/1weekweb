"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { growthPlans } from "@/data/content";
import { cn } from "@/lib/utils";

export default function GrowthPlan() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
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
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="section-label">Ongoing Support</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Keep your website improving after launch
          </h2>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            Ongoing support, updates, and optimisation — for businesses that
            want more than a one-time build.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 max-w-4xl mx-auto">
          {growthPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Badge — outside overflow-hidden so it's never clipped */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-fuchsia-500 text-white text-[11px] font-bold tracking-widest uppercase shadow-lg shadow-fuchsia-500/40">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={cn(
                  "relative rounded-2xl p-7 flex flex-col border overflow-hidden transition-all duration-300",
                  plan.highlighted
                    ? "border-fuchsia-500/40"
                    : "bg-zinc-800/50 border-white/[0.09] hover:border-white/[0.15]"
                )}
                style={
                  plan.highlighted
                    ? {
                        background:
                          "linear-gradient(160deg, rgba(217,70,239,0.07) 0%, rgb(24,24,27) 35%)",
                        boxShadow:
                          "0 0 0 1px rgba(217,70,239,0.15), 0 20px 60px -15px rgba(217,70,239,0.3)",
                      }
                    : {}
                }
              >
              {/* Highlighted: top accent */}
              {plan.highlighted && (
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(217,70,239,0.7), transparent)",
                  }}
                />
              )}

              {/* Name + description */}
              <div className="mb-5">
                <h3
                  className={cn(
                    "font-bold text-lg mb-1",
                    plan.highlighted ? "text-white" : "text-zinc-300"
                  )}
                >
                  {plan.name}
                </h3>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-0.5 mb-6">
                <span
                  className={cn(
                    "font-black tracking-tight leading-none text-3xl",
                    plan.highlighted ? "text-white" : "text-zinc-300"
                  )}
                >
                  {plan.price}
                </span>
                <span className="text-zinc-500 text-sm ml-1">
                  /{plan.period}
                </span>
              </div>

              {/* Divider */}
              <div
                className={cn(
                  "h-px mb-6",
                  plan.highlighted ? "bg-fuchsia-500/20" : "bg-white/[0.05]"
                )}
              />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check
                      className={cn(
                        "w-4 h-4 shrink-0",
                        plan.highlighted ? "text-fuchsia-400" : "text-zinc-600"
                      )}
                      strokeWidth={2.5}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        plan.highlighted ? "text-zinc-100" : "text-zinc-300"
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
                  "inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-bold text-sm transition-all duration-200 group",
                  plan.highlighted
                    ? "bg-fuchsia-500 hover:bg-fuchsia-400 text-white"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.07] hover:border-white/[0.15]"
                )}
                style={
                  plan.highlighted
                    ? { boxShadow: "0 0 20px -4px rgba(217,70,239,0.4)" }
                    : {}
                }
              >
                Get started
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              </div>
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
