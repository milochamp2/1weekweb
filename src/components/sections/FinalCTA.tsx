"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Phone, CheckCircle } from "lucide-react";

const trustItems = [
  { icon: Phone, label: "Free discovery call" },
  { icon: Clock, label: "Live in 7 days" },
  { icon: CheckCircle, label: "No lock-in contracts" },
];

export default function FinalCTA() {
  return (
    <section className="py-28 sm:py-36 relative overflow-hidden">
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(217,70,239,0.5) 40%, rgba(217,70,239,0.5) 60%, transparent 100%)",
        }}
      />
      {/* Bottom gradient border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent 100%)",
        }}
      />

      {/* Deep glow — strong, centered */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(217,70,239,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Secondary glow — top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,70,239,0.12) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <span className="section-label mb-6">Ready to grow?</span>

          {/* Headline — biggest on the page */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.07] mb-6">
            Your next website.
            <br />
            Live in{" "}
            <span
              className="text-fuchsia-400"
              style={{ textShadow: "0 0 40px rgba(217,70,239,0.4)" }}
            >
              7 days.
            </span>
          </h2>

          {/* Sub copy */}
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-xl mb-10">
            Built to convert, not just look good. Book a free discovery call and
            we&apos;ll map out exactly what your site needs.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold rounded-full transition-all duration-200 text-base group"
              style={{ boxShadow: "0 0 40px -8px rgba(217,70,239,0.55)" }}
            >
              Book a Free Discovery Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-zinc-300 hover:text-white font-semibold rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-200 text-base"
            >
              Send an Inquiry
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-zinc-500"
              >
                <item.icon className="w-3.5 h-3.5 text-fuchsia-500/60 shrink-0" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
