"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/content";

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 sm:py-32 relative overflow-hidden bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16 max-w-xl mx-auto"
        >
          <span className="section-label">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            A simple 4-step process
          </h2>
          <p className="mt-4 text-gray-600 text-base">
            From first call to live website — we handle the heavy lifting.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(217,70,239,0.3) 20%, rgba(217,70,239,0.3) 80%, transparent)",
            }}
          />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number */}
              <div
                className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 bg-white border border-gray-200"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <span className="text-xl font-black text-fuchsia-500 tabular-nums">
                  {step.number}
                </span>
              </div>

              <h3 className="text-gray-900 font-semibold text-base mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
