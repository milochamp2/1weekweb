"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";

const tagColors: Record<string, string> = {
  Website: "bg-zinc-800 text-zinc-400",
  Funnel: "bg-fuchsia-500/10 text-fuchsia-400",
  Booking: "bg-blue-500/10 text-blue-400",
  Automation: "bg-emerald-500/10 text-emerald-400",
  SEO: "bg-amber-500/10 text-amber-400",
};

export default function Work() {
  return (
    <section id="work" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="section-label">Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Selected work
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs sm:text-right">
            Case studies coming soon as we complete more builds.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl bg-zinc-900 border border-white/[0.07] overflow-hidden hover:border-white/[0.14] transition-all duration-300 flex flex-col"
            >
              {/* Placeholder image area */}
              <div className="relative h-44 bg-zinc-800/60 overflow-hidden">
                {/* Abstract placeholder */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `linear-gradient(135deg,
                      rgba(217,70,239,${0.15 + i * 0.05}) 0%,
                      rgba(99,102,241,${0.1 + i * 0.03}) 50%,
                      transparent 100%
                    )`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-zinc-700/50 border border-white/[0.08] mx-auto mb-3 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-md bg-fuchsia-500/40" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-24 rounded-full bg-zinc-700/60 mx-auto" />
                      <div className="h-1.5 w-16 rounded-full bg-zinc-700/40 mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Category pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-zinc-950/70 backdrop-blur-sm text-zinc-400 text-xs border border-white/[0.07]">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-base mb-2">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-4">
                  {project.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border border-transparent ${tagColors[tag] ?? "bg-zinc-800 text-zinc-400"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <button
                  disabled
                  className="inline-flex items-center gap-1.5 text-zinc-500 text-sm font-medium group/btn cursor-not-allowed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500/50 animate-pulse" />
                  Coming Soon
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
