"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/content";

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 sm:py-32 bg-zinc-900/30 relative overflow-hidden"
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
          <span className="inline-block text-fuchsia-400 text-sm font-medium mb-4 tracking-wide uppercase">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            A simple 4-step process
          </h2>
          <p className="mt-4 text-zinc-400">
            From first call to live website — we handle the heavy lifting.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col"
            >
              {/* Step number bubble */}
              <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-900 border border-white/[0.10] flex items-center justify-center">
                <span className="text-2xl font-bold text-fuchsia-400 font-mono">
                  {step.number}
                </span>
                {/* Glow on number */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: "0 0 30px -6px rgba(217,70,239,0.2)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-semibold rounded-full transition-all duration-200 text-sm shadow-lg shadow-fuchsia-500/25"
          >
            Start your project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
