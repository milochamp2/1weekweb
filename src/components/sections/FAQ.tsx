"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/content";
import { cn } from "@/lib/utils";

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className={cn(
        "rounded-2xl border transition-all duration-200",
        isOpen
          ? "bg-zinc-900 border-fuchsia-500/25"
          : "bg-zinc-900/60 border-white/[0.06] hover:border-white/[0.12]"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-white font-medium text-sm sm:text-base leading-snug">
          {faq.question}
        </span>
        <span
          className={cn(
            "shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200",
            isOpen
              ? "bg-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-400"
              : "bg-zinc-800 border-white/[0.07] text-zinc-400"
          )}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-fuchsia-500/15 mb-4" />
              <p className="text-zinc-400 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 bg-zinc-900/30 relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-fuchsia-400 text-sm font-medium mb-4 tracking-wide uppercase">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-zinc-400">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-zinc-500 text-sm">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-fuchsia-400 hover:text-fuchsia-300 underline underline-offset-4 transition-colors"
            >
              Send us a message
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
