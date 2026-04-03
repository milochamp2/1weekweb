"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { navLinks } from "@/data/content";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 border-t border-white/10">
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
            <a href="#home" className="flex items-center gap-2 w-fit group">
              <Image
                src="/logo/logo.png"
                alt="1LaunchLayer logo"
                width={32}
                height={32}
                className="shrink-0"
              />
              <span className="text-white font-bold text-[17px] tracking-tight">
                1Launch<span className="text-fuchsia-400">Layer</span>
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
            <h4 className="text-gray-500 text-[11px] font-bold mb-5 uppercase tracking-[0.1em]">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
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
            <h4 className="text-gray-500 text-[11px] font-bold mb-5 uppercase tracking-[0.1em]">
              Get in touch
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@1launchlayer.com.au"
                aria-label="Email us at hello@1launchlayer.com.au"
                className="flex items-center gap-2.5 text-gray-400 hover:text-fuchsia-400 text-sm transition-colors group"
              >
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                hello@1launchlayer.com.au
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center w-fit gap-1.5 px-4 py-2 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 text-xs font-semibold rounded-full border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all duration-200"
              >
                Book a free call →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-gray-600 text-xs">
            © {currentYear} 1LaunchLayer. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built by 1LaunchLayer · Australia
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
