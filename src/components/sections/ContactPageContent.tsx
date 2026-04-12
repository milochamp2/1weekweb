"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, ChevronDown, CheckCircle, Clock, Phone,
  ArrowRight, Mail, MessageSquare, CalendarCheck,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const packageOptions = [
  "Fast — $1,500",
  "Professional — $1,900",
  "Not sure yet",
];

const helpOptions = [
  "New website build",
  "Website redesign",
  "Website audit",
  "Add-on service",
  "Ongoing support",
  "Other",
];

interface FormState {
  name: string;
  businessName: string;
  email: string;
  website: string;
  help: string;
  packageInterest: string;
  _honeypot: string;
}

const initialState: FormState = {
  name: "",
  businessName: "",
  email: "",
  website: "",
  help: "",
  packageInterest: "",
  _honeypot: "",
};

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-bold text-gray-300 tracking-[0.07em] uppercase"
      >
        {label}
        {required && (
          <span className="text-fuchsia-400 ml-0.5" aria-hidden="true">*</span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-200";

const selectCls = cn(inputCls, "appearance-none cursor-pointer");

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" aria-hidden="true" />
    </div>
  );
}

function SuccessState({ name, onReset }: { name: string; onReset: () => void }) {
  const firstName = name.split(" ")[0];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
      className="rounded-2xl bg-gray-800 border border-white/10 overflow-hidden"
      style={{ boxShadow: "0 4px 32px rgba(217,70,239,0.15)" }}
    >
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #d946ef, #a855f7, #6366f1)" }} />
      <div className="p-8 sm:p-10 flex flex-col items-center text-center gap-6">
        <div className="flex items-center gap-2.5">
          <Image src="/logo/logo_polished.png" alt="1LaunchLayer logo" width={36} height={36} className="shrink-0" />
          <span className="text-white font-bold text-lg tracking-tight">
            1Launch<span className="text-fuchsia-400">Layer</span>
          </span>
        </div>
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(217,70,239,0.15)", border: "1px solid rgba(217,70,239,0.3)" }}
        >
          <CheckCircle className="w-8 h-8 text-fuchsia-400" />
        </div>
        <div>
          <h3 className="text-white font-extrabold text-2xl tracking-tight mb-2">Got it, {firstName}!</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Your enquiry is in. We'll reach out within{" "}
            <span className="text-white font-semibold">1 business day</span> to book your free discovery call.
          </p>
        </div>
        <div className="w-full rounded-xl bg-white/5 border border-white/10 p-5 text-left flex flex-col gap-3.5">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.08em]">What happens next</p>
          {[
            { icon: Phone, label: "We review your enquiry — usually same day" },
            { icon: Clock, label: "You'll hear from us within 1 business day" },
            { icon: CheckCircle, label: "We'll book your free 30-min discovery call" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shrink-0 mt-px">
                <Icon className="w-3 h-3 text-fuchsia-400" aria-hidden="true" />
              </div>
              <span className="text-gray-300 text-sm leading-snug">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <a
            href="/#packages"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-fuchsia-500 hover:bg-fuchsia-400 text-white text-sm font-bold rounded-full transition-colors group"
          >
            View Packages
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </a>
          <button
            onClick={onReset}
            className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-white/10 hover:bg-white/15 text-gray-300 text-sm font-semibold rounded-full transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const contactDetails = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@1launchlayer.com.au",
    href: "mailto:hello@1launchlayer.com.au",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 1 business day",
    href: null,
  },
  {
    icon: CalendarCheck,
    label: "Discovery call",
    value: "Free 30-minute session",
    href: null,
  },
  {
    icon: MessageSquare,
    label: "Based in",
    value: "Australia",
    href: null,
  },
];

export default function ContactPageContent() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form._honeypot) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Send failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page header */}
      <section className="relative pt-32 pb-16 bg-gray-900 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] -translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(217,70,239,0.1) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm mb-8 transition-colors"
            >
              ← Back to home
            </a>
            <span className="section-label section-label-light">Get in Touch</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mt-1">
              Let&apos;s build something
              <br className="hidden sm:block" />
              <span className="text-fuchsia-400"> worth talking about.</span>
            </h1>
            <p className="mt-4 text-gray-400 text-lg max-w-xl">
              Tell us about your project. We&apos;ll review it and be in touch within 1 business day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 sm:py-24 bg-gray-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_560px] gap-12 lg:gap-16 items-start">

            {/* Left — contact details */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-col gap-8"
            >
              {/* Detail cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-fuchsia-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-[0.07em] mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-white text-sm font-medium hover:text-fuchsia-400 transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Packages quick glance */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.08em] mb-4">Packages</p>
                <div className="flex flex-col gap-3">
                  {[
                    { name: "Fast", price: "$1,500", desc: "Launch in 7 days" },
                    { name: "Professional", price: "$1,900", desc: "Conversion-focused" },
                  ].map((pkg) => (
                    <div key={pkg.name} className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm font-semibold">{pkg.name}</p>
                        <p className="text-gray-500 text-xs">{pkg.desc}</p>
                      </div>
                      <span className="text-fuchsia-400 font-bold text-sm">{pkg.price}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="/#packages"
                  className="mt-4 inline-flex items-center gap-1 text-gray-500 hover:text-fuchsia-400 text-xs font-medium transition-colors"
                >
                  See full details →
                </a>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessState
                    key="success"
                    name={form.name}
                    onReset={() => { setSubmitted(false); setForm(initialState); }}
                  />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact enquiry form"
                    className="rounded-2xl bg-gray-800 border border-white/10 p-6 sm:p-8 flex flex-col gap-5"
                    style={{ boxShadow: "0 2px 32px rgba(0,0,0,0.3)" }}
                  >
                    {/* Honeypot */}
                    <div aria-hidden="true" className="hidden">
                      <label htmlFor="cp_website_url">Leave this empty</label>
                      <input id="cp_website_url" name="cp_website_url" type="text" tabIndex={-1} autoComplete="off" value={form._honeypot} onChange={set("_honeypot")} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Your name" htmlFor="cp-name" required>
                        <input id="cp-name" type="text" required placeholder="Alex Johnson" autoComplete="name" value={form.name} onChange={set("name")} className={inputCls} />
                      </Field>
                      <Field label="Business name" htmlFor="cp-business" required>
                        <input id="cp-business" type="text" required placeholder="Acme Plumbing" autoComplete="organization" value={form.businessName} onChange={set("businessName")} className={inputCls} />
                      </Field>
                    </div>

                    <Field label="Email address" htmlFor="cp-email" required>
                      <input id="cp-email" type="email" required placeholder="alex@yourbusiness.com.au" autoComplete="email" value={form.email} onChange={set("email")} className={inputCls} />
                    </Field>

                    <Field label="Current website URL" htmlFor="cp-website">
                      <input id="cp-website" type="text" placeholder="https://yourbusiness.com.au (if you have one)" autoComplete="url" value={form.website} onChange={set("website")} className={inputCls} />
                    </Field>

                    <Field label="What do you need help with?" htmlFor="cp-help" required>
                      <SelectWrapper>
                        <select id="cp-help" required value={form.help} onChange={set("help")} className={cn(selectCls, "[&>option]:bg-gray-800 [&>option]:text-white")}>
                          <option value="" disabled>Select an option...</option>
                          {helpOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </SelectWrapper>
                    </Field>

                    <Field label="Package interest" htmlFor="cp-package">
                      <SelectWrapper>
                        <select id="cp-package" value={form.packageInterest} onChange={set("packageInterest")} className={cn(selectCls, "[&>option]:bg-gray-800 [&>option]:text-white")}>
                          <option value="">Select a package...</option>
                          {packageOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </SelectWrapper>
                    </Field>

                    {error && (
                      <p role="alert" className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-1 inline-flex items-center justify-center gap-2 w-full py-4 bg-fuchsia-500 hover:bg-fuchsia-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-200 text-sm group shadow-lg shadow-fuchsia-500/20"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-gray-500 text-xs">
                      We respond within 1 business day. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
