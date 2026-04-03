"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 max-w-xl mx-auto"
        >
          <span className="section-label">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            What our clients say
          </h2>
          <p className="mt-4 text-gray-600">
            Real feedback from real Australian service businesses.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white border border-gray-200 p-6 flex flex-col gap-4"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-fuchsia-100 border border-fuchsia-200 flex items-center justify-center shrink-0">
                  <span className="text-fuchsia-600 text-xs font-bold">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-semibold leading-tight">
                    {t.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {t.role},{" "}
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fuchsia-500 hover:text-fuchsia-600 transition-colors"
                    >
                      {t.business}
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
