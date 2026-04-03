"use client";

import { motion } from "framer-motion";
import { Layers, Mail, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/data/content";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-4"
          >
            <a href="#home" className="flex items-center gap-2.5 w-fit group">
              <div className="w-7 h-7 rounded-lg bg-fuchsia-500 flex items-center justify-center shrink-0 group-hover:bg-fuchsia-600 transition-colors">
                <Layers className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-gray-900 font-bold text-[17px] tracking-tight">
                1Week<span className="text-fuchsia-500">Web</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[220px]">
              High-converting websites for Australian service businesses. Built
              in 7 days.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <h4 className="text-gray-500 text-xs font-semibold mb-5 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <h4 className="text-gray-500 text-xs font-semibold mb-5 uppercase tracking-widest">
              Get in touch
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@1weekweb.com.au"
                className="flex items-center gap-2.5 text-gray-500 hover:text-fuchsia-500 text-sm transition-colors group"
              >
                <Mail className="w-4 h-4 shrink-0" />
                hello@1weekweb.com.au
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center w-fit gap-1.5 px-4 py-2 bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-600 text-xs font-semibold rounded-full border border-fuchsia-200 hover:border-fuchsia-300 transition-all duration-200"
              >
                Book a free call →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-8" />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-gray-400 text-xs">
            © {currentYear} 1WeekWeb. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs">
            Built by 1WeekWeb · Australia
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
