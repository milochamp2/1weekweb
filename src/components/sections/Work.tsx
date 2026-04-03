"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/content";

const tagColors: Record<string, string> = {
  Website: "bg-gray-100 text-gray-600",
  Funnel: "bg-fuchsia-50 text-fuchsia-600",
  Booking: "bg-blue-50 text-blue-600",
  Automation: "bg-emerald-50 text-emerald-600",
  SEO: "bg-amber-50 text-amber-600",
};

export default function Work() {
  return (
    <section id="work" className="py-24 sm:py-32 relative overflow-hidden bg-white">
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Selected work
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs sm:text-right">
            Real projects. Real results. Built for service businesses across Australia.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl bg-white border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            >
              {/* Screenshot */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                {/* Category pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 text-xs border border-gray-200 font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-gray-900 font-semibold text-base mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
                  {project.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${tagColors[tag] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live link */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-fuchsia-500 hover:text-fuchsia-600 text-sm font-semibold transition-colors group/btn"
                >
                  View live site
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
