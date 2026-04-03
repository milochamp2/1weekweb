"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, TrendingUp, Users, Clock } from "lucide-react";

const EASE = [0.25, 0.4, 0.25, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-white"
    >
      {/* Soft fuchsia ambient glow — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(217,70,239,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 20%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 20%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-7">
            {/* Eyebrow pill */}
            <motion.div {...fade(0.1)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-600 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
                For Australian service businesses
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fade(0.18)}
              className="text-4xl sm:text-5xl xl:text-[3.75rem] font-extrabold text-gray-900 leading-[1.08]"
            >
              Launch a{" "}
              <span className="text-fuchsia-500">
                high&#8209;converting
              </span>{" "}
              website in{" "}
              <span className="relative inline-block">
                7 days
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(217,70,239,0.7) 0%, rgba(217,70,239,0.1) 100%)",
                  }}
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fade(0.26)}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-[500px]"
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
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold rounded-full transition-all duration-200 text-sm group shadow-lg shadow-fuchsia-500/25"
              >
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-7 py-4 text-gray-700 hover:text-gray-900 font-semibold rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-sm"
              >
                Get a Free Website Audit
              </a>
            </motion.div>

            {/* Trust points */}
            <motion.div
              {...fade(0.42)}
              className="flex flex-wrap gap-x-5 gap-y-2 pt-1"
            >
              {[
                "Fast builds",
                "Clear structure",
                "Lead-focused design",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-gray-500 text-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-fuchsia-500 shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="hidden lg:block relative"
          >
            {/* Outer glow */}
            <div
              className="absolute -inset-8 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(217,70,239,0.08) 0%, transparent 70%)",
                filter: "blur(32px)",
              }}
            />

            {/* Browser frame */}
            <div
              className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white"
              style={{ boxShadow: "0 24px 64px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-4 py-3.5 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="px-3 py-1.5 rounded-md bg-white border border-gray-200 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-gray-300 opacity-60 shrink-0" />
                    <span className="text-gray-400 text-xs">yoursite.com.au</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3.5 bg-white">
                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="rounded-xl bg-white border border-gray-200 p-4"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <TrendingUp className="w-3.5 h-3.5 text-fuchsia-500" />
                      <span className="text-gray-400 text-[11px]">Monthly Leads</span>
                    </div>
                    <div className="text-gray-900 font-bold text-2xl leading-none tracking-tight">
                      +147%
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="text-emerald-600 text-[11px]">↑ vs last month</span>
                    </div>
                  </div>
                  <div
                    className="rounded-xl bg-white border border-gray-200 p-4"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <Users className="w-3.5 h-3.5 text-fuchsia-500" />
                      <span className="text-gray-400 text-[11px]">Conversion Rate</span>
                    </div>
                    <div className="text-gray-900 font-bold text-2xl leading-none tracking-tight">
                      4.8%
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="text-emerald-600 text-[11px]">↑ avg is 2.1%</span>
                    </div>
                  </div>
                </div>

                {/* Mini site preview */}
                <div className="rounded-xl border border-gray-100 p-5 bg-gray-50">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-5 h-5 rounded-md bg-fuchsia-100 border border-fuchsia-200 shrink-0" />
                    <div className="h-2 w-20 rounded-full bg-gray-200" />
                    <div className="ml-auto flex gap-2">
                      <div className="h-2 w-10 rounded-full bg-gray-200" />
                      <div className="h-2 w-10 rounded-full bg-gray-200" />
                      <div className="h-2 w-10 rounded-full bg-gray-200" />
                    </div>
                  </div>
                  <div className="space-y-2.5 mb-5">
                    <div className="h-4 w-3/4 rounded-md bg-gray-200" />
                    <div className="h-3 w-1/2 rounded-md bg-gray-200" />
                    <div className="h-2 w-5/6 rounded-full bg-gray-100 mt-3" />
                    <div className="h-2 w-2/3 rounded-full bg-gray-100" />
                  </div>
                  <div className="flex gap-2.5">
                    <div className="px-4 py-2 rounded-full bg-fuchsia-500">
                      <span className="text-white text-[11px] font-semibold">Book a Call</span>
                    </div>
                    <div className="px-4 py-2 rounded-full border border-gray-200 bg-white">
                      <span className="text-gray-500 text-[11px]">Learn More</span>
                    </div>
                  </div>
                </div>

                {/* Bottom status */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-fuchsia-500" />
                    <span className="text-gray-400 text-xs">Live in 7 days</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-gray-400 text-xs">Fully optimised</span>
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
