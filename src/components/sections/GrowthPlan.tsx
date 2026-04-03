"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { growthPlans } from "@/data/content";
import { cn } from "@/lib/utils";

export default function GrowthPlan() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gray-50 border-t border-gray-100">
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Keep your website improving after launch
          </h2>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
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
              {/* Badge — outside overflow-hidden */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-fuchsia-500 text-white text-[11px] font-bold tracking-widest uppercase shadow-lg shadow-fuchsia-500/30">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={cn(
                  "relative rounded-2xl p-7 flex flex-col border overflow-hidden transition-all duration-300",
                  plan.highlighted
                    ? "border-2 border-fuchsia-400"
                    : "bg-white border-gray-200 hover:border-gray-300"
                )}
                style={
                  plan.highlighted
                    ? {
                        background:
                          "linear-gradient(160deg, rgba(217,70,239,0.04) 0%, #fff 35%)",
                        boxShadow:
                          "0 0 0 1px rgba(217,70,239,0.15), 0 20px 48px -12px rgba(217,70,239,0.18)",
                      }
                    : { boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }
                }
              >
                {/* Highlighted: top accent */}
                {plan.highlighted && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(217,70,239,0.9), transparent)",
                    }}
                  />
                )}

                {/* Name + description */}
                <div className="mb-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-0.5 mb-6">
                  <span className="font-black tracking-tight leading-none text-3xl text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">
                    /{plan.period}
                  </span>
                </div>

                {/* Divider */}
                <div
                  className={cn(
                    "h-px mb-6",
                    plan.highlighted ? "bg-fuchsia-200" : "bg-gray-100"
                  )}
                />

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <Check
                        className={cn(
                          "w-4 h-4 shrink-0",
                          plan.highlighted ? "text-fuchsia-500" : "text-gray-400"
                        )}
                        strokeWidth={2.5}
                      />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-bold text-sm transition-all duration-200 group",
                    plan.highlighted
                      ? "bg-fuchsia-500 hover:bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/25"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  )}
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
          className="text-center text-gray-400 text-sm mt-8"
        >
          Cancel anytime. No lock-in contracts.
        </motion.p>
      </div>
    </section>
  );
}
