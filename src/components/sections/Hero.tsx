"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, TrendingUp, Users, Clock } from "lucide-react";

const EASE = [0.25, 0.4, 0.25, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] -translate-y-1/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(217,70,239,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-6 lg:gap-7">
            {/* Eyebrow pill */}
            <motion.div {...fade(0.1)}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                For Australian service businesses
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fade(0.18)}
              className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Launch a{" "}
              <span className="text-fuchsia-400">high-converting</span>
              <br />
              website in{" "}
              <span className="relative inline-block">
                7 days
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(217,70,239,0.8) 0%, rgba(217,70,239,0.2) 100%)",
                  }}
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fade(0.26)}
              className="text-lg text-zinc-400 leading-relaxed max-w-[520px]"
            >
              Built for service businesses that want more leads, faster results,
              and a website that actually works.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fade(0.34)}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-semibold rounded-full transition-all duration-200 text-sm group shadow-lg shadow-fuchsia-500/25"
              >
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold rounded-full border border-white/[0.12] hover:border-white/[0.2] transition-all duration-200 text-sm"
              >
                Get a Free Website Audit
              </a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              {...fade(0.42)}
              className="flex flex-wrap gap-x-5 gap-y-2"
            >
              {[
                "Fast builds",
                "Clear structure",
                "Lead-focused design",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-zinc-400 text-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="hidden lg:block relative"
          >
            {/* Glow behind card */}
            <div
              className="absolute -inset-6 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(217,70,239,0.15) 0%, transparent 70%)",
                filter: "blur(24px)",
              }}
            />

            {/* Browser frame */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.10] bg-zinc-900 shadow-2xl shadow-black/50">
              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-4 py-3 bg-zinc-800/70 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="px-3 py-1.5 rounded-md bg-zinc-700/50 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-zinc-600 shrink-0" />
                    <span className="text-zinc-500 text-xs">
                      yoursite.com.au
                    </span>
                  </div>
                </div>
              </div>

              {/* Website content preview */}
              <div className="p-5 space-y-4">
                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-zinc-800/50 border border-white/[0.06] p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <TrendingUp className="w-3.5 h-3.5 text-fuchsia-400" />
                      <span className="text-zinc-500 text-[11px]">
                        Monthly Leads
                      </span>
                    </div>
                    <div className="text-white font-bold text-2xl leading-none">
                      +147%
                    </div>
                    <div className="text-emerald-400 text-[11px] mt-1.5">
                      ↑ vs last month
                    </div>
                  </div>
                  <div className="rounded-xl bg-zinc-800/50 border border-white/[0.06] p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Users className="w-3.5 h-3.5 text-fuchsia-400" />
                      <span className="text-zinc-500 text-[11px]">
                        Conversion Rate
                      </span>
                    </div>
                    <div className="text-white font-bold text-2xl leading-none">
                      4.8%
                    </div>
                    <div className="text-emerald-400 text-[11px] mt-1.5">
                      ↑ avg is 2.1%
                    </div>
                  </div>
                </div>

                {/* Mini site preview */}
                <div className="rounded-xl bg-zinc-800/30 border border-white/[0.05] p-5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-6 h-6 rounded-md bg-fuchsia-500/20 border border-fuchsia-500/30" />
                    <div className="h-2 w-20 rounded-full bg-zinc-700" />
                    <div className="ml-auto flex gap-2">
                      <div className="h-2 w-12 rounded-full bg-zinc-800" />
                      <div className="h-2 w-12 rounded-full bg-zinc-800" />
                    </div>
                  </div>
                  <div className="space-y-2.5 mb-5">
                    <div className="h-4 w-3/4 rounded-md bg-zinc-700/70" />
                    <div className="h-3 w-1/2 rounded-md bg-zinc-700/50" />
                    <div className="h-2.5 w-5/6 rounded-full bg-zinc-800/80" />
                    <div className="h-2.5 w-2/3 rounded-full bg-zinc-800/60" />
                  </div>
                  <div className="flex gap-2.5">
                    <div className="px-4 py-2 rounded-full bg-fuchsia-500/80 flex items-center">
                      <span className="text-white text-[11px] font-semibold">
                        Book a Call
                      </span>
                    </div>
                    <div className="px-4 py-2 rounded-full border border-white/[0.12]">
                      <span className="text-zinc-400 text-[11px]">
                        Learn More
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom status row */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
                    <span className="text-zinc-500 text-xs">Live in 7 days</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-zinc-500 text-xs">
                      Fully optimised
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
