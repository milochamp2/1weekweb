"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronDown, CheckCircle, Clock, Phone, ArrowRight } from "lucide-react";
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
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
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
      style={{ boxShadow: "0 4px 32px rgba(217,70,239,0.15), 0 1px 4px rgba(0,0,0,0.3)" }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: "linear-gradient(90deg, #d946ef, #a855f7, #6366f1)" }}
      />

      <div className="p-8 sm:p-10 flex flex-col items-center text-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo/logo_polished.png"
            alt="1LaunchLayer logo"
            width={36}
            height={36}
            className="shrink-0"
          />
          <span className="text-white font-bold text-lg tracking-tight">
            1Launch<span className="text-fuchsia-400">Layer</span>
          </span>
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(217,70,239,0.15)", border: "1px solid rgba(217,70,239,0.3)" }}
        >
          <CheckCircle className="w-8 h-8 text-fuchsia-400" />
        </div>

        {/* Message */}
        <div>
          <h3 className="text-white font-extrabold text-2xl tracking-tight mb-2">
            Got it, {firstName}!
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Your enquiry is in. We'll review your details and reach out within{" "}
            <span className="text-white font-semibold">1 business day</span>{" "}
            to book your free discovery call.
          </p>
        </div>

        {/* What's next */}
        <div className="w-full rounded-xl bg-white/5 border border-white/10 p-5 text-left flex flex-col gap-3.5">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.08em]">
            What happens next
          </p>
          {[
            { icon: Phone, label: "We review your enquiry — usually same day" },
            { icon: Clock, label: "You'll hear from us within 1 business day" },
            { icon: CheckCircle, label: "We'll book your free 30-min discovery call" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shrink-0 mt-px">
                <Icon className="w-3 h-3 text-fuchsia-400" />
              </div>
              <span className="text-gray-300 text-sm leading-snug">{label}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <a
            href="#packages"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-fuchsia-500 hover:bg-fuchsia-400 text-white text-sm font-bold rounded-full transition-colors shadow-md shadow-fuchsia-500/20 group"
          >
            View Packages
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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

export default function ContactForm() {
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
    // Honeypot check — bots fill hidden fields
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
    <section
      id="contact"
      className="py-16 sm:py-24 relative overflow-hidden bg-gray-900"
    >
      {/* Top divider */}
      <div className="section-divider" />

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <span className="section-label section-label-light">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tell us about your project
          </h2>
          <p className="mt-4 text-gray-400 text-base">
            We&apos;ll be in touch within 1 business day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessState
                key="success"
                name={form.name}
                onReset={() => {
                  setSubmitted(false);
                  setForm(initialState);
                }}
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
                {/* Honeypot — hidden from real users */}
                <div aria-hidden="true" className="hidden">
                  <label htmlFor="website_url">Leave this empty</label>
                  <input
                    id="website_url"
                    name="website_url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form._honeypot}
                    onChange={set("_honeypot")}
                  />
                </div>

                {/* Name + Business */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your name" htmlFor="field-name" required>
                    <input
                      id="field-name"
                      type="text"
                      required
                      placeholder="Alex Johnson"
                      autoComplete="name"
                      value={form.name}
                      onChange={set("name")}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Business name" htmlFor="field-business" required>
                    <input
                      id="field-business"
                      type="text"
                      required
                      placeholder="Acme Plumbing"
                      autoComplete="organization"
                      value={form.businessName}
                      onChange={set("businessName")}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Email address" htmlFor="field-email" required>
                  <input
                    id="field-email"
                    type="email"
                    required
                    placeholder="alex@yourbusiness.com.au"
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    className={inputCls}
                  />
                </Field>

                <Field label="Current website URL" htmlFor="field-website">
                  <input
                    id="field-website"
                    type="text"
                    placeholder="https://yourbusiness.com.au (if you have one)"
                    autoComplete="url"
                    value={form.website}
                    onChange={set("website")}
                    className={inputCls}
                  />
                </Field>

                <Field label="What do you need help with?" htmlFor="field-help" required>
                  <SelectWrapper>
                    <select
                      id="field-help"
                      required
                      value={form.help}
                      onChange={set("help")}
                      className={cn(selectCls, "text-sm [&>option]:bg-gray-800 [&>option]:text-white")}
                    >
                      <option value="" disabled>
                        Select an option...
                      </option>
                      {helpOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </SelectWrapper>
                </Field>

                <Field label="Package interest" htmlFor="field-package">
                  <SelectWrapper>
                    <select
                      id="field-package"
                      value={form.packageInterest}
                      onChange={set("packageInterest")}
                      className={cn(selectCls, "text-sm [&>option]:bg-gray-800 [&>option]:text-white")}
                    >
                      <option value="">Select a package...</option>
                      {packageOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </SelectWrapper>
                </Field>

                {/* Error */}
                {error && (
                  <p role="alert" className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                {/* Submit */}
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
    </section>
  );
}
