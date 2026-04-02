"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Dramatic glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(217,70,239,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(217,70,239,0.3), transparent)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex flex-col items-center gap-7"
        >
          {/* Icon badge */}
          <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/25 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-fuchsia-400" />
          </div>

          {/* Headline */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Ready to launch a website
              <br className="hidden sm:block" />
              that actually{" "}
              <span className="text-fuchsia-400">works?</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto">
              Get a clean, modern, lead-focused website built in 7 days. No
              fluff. No waiting. Just results.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold rounded-full transition-all duration-200 text-base group shadow-xl shadow-fuchsia-500/30"
            >
              Book a Free Discovery Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.06] hover:bg-white/[0.10] text-white font-semibold rounded-full border border-white/[0.12] hover:border-white/[0.2] transition-all duration-200 text-base"
            >
              Send an Inquiry
            </a>
          </div>

          {/* Social proof note */}
          <p className="text-zinc-600 text-sm">
            Free discovery call · No obligation · 7-day build
          </p>
        </motion.div>
      </div>
    </section>
  );
}
