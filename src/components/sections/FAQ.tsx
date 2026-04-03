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
          ? "bg-white border-fuchsia-200 shadow-sm"
          : "bg-white border-gray-200 hover:border-gray-300"
      )}
      style={{ boxShadow: isOpen ? "0 2px 12px rgba(217,70,239,0.08)" : "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-gray-900 font-medium text-sm sm:text-base leading-snug">
          {faq.question}
        </span>
        <span
          className={cn(
            "shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200",
            isOpen
              ? "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-500"
              : "bg-gray-100 border-gray-200 text-gray-400"
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
              <div className="h-px bg-fuchsia-100 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
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
      className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-gray-100"
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
          <span className="section-label">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-gray-600">
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-gray-500 text-sm">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-fuchsia-500 hover:text-fuchsia-600 underline underline-offset-4 transition-colors"
            >
              Send us a message
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
