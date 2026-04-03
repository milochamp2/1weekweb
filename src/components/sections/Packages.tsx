"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { packages } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Packages() {
  return (
    <section id="packages" className="py-24 sm:py-32 relative overflow-hidden bg-white">
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Simple packages.{" "}
            <span className="text-fuchsia-500">Clear outcomes.</span>
          </h2>
          <p className="mt-4 text-gray-600 text-base">
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
              className="relative"
            >
              {/* Badge — outside overflow-hidden so it's never clipped */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-fuchsia-500 text-white text-[11px] font-bold tracking-widest uppercase shadow-lg shadow-fuchsia-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={cn(
                  "relative rounded-2xl overflow-hidden flex flex-col",
                  pkg.highlighted
                    ? "border-2 border-fuchsia-400"
                    : "border border-gray-200 bg-white"
                )}
                style={
                  pkg.highlighted
                    ? {
                        background:
                          "linear-gradient(160deg, rgba(217,70,239,0.04) 0%, #fff 35%)",
                        boxShadow:
                          "0 0 0 1px rgba(217,70,239,0.15), 0 24px 60px -12px rgba(217,70,239,0.18)",
                      }
                    : { boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }
                }
              >
                {/* Growth: top accent bar */}
                {pkg.highlighted && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(217,70,239,0.9), transparent)",
                    }}
                  />
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Name + period */}
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={cn(
                        "font-bold text-xl",
                        pkg.highlighted ? "text-gray-900" : "text-gray-800"
                      )}
                    >
                      {pkg.name}
                    </h3>
                    <span className="text-gray-400 text-xs font-medium">
                      {pkg.period}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <span
                      className={cn(
                        "font-black tracking-tight leading-none text-gray-900",
                        pkg.highlighted ? "text-5xl" : "text-4xl"
                      )}
                    >
                      {pkg.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Divider */}
                  <div
                    className={cn(
                      "h-px mb-6",
                      pkg.highlighted ? "bg-fuchsia-200" : "bg-gray-100"
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
                              ? "bg-fuchsia-100 text-fuchsia-500"
                              : "bg-gray-100 text-gray-500"
                          )}
                        >
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 group",
                      pkg.highlighted
                        ? "bg-fuchsia-500 hover:bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/25"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                    )}
                  >
                    {pkg.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
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
          className="text-center text-gray-400 text-sm mt-8"
        >
          All packages include a free 30-minute discovery call.{" "}
          <a
            href="#faq"
            className="text-gray-500 hover:text-fuchsia-500 underline underline-offset-4 transition-colors"
          >
            See FAQs →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
