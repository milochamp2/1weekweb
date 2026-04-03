"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronDown, CheckCircle, Clock, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const packageOptions = [
  "Launch — $1,000",
  "Growth — $2,000",
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
}

const initialState: FormState = {
  name: "",
  businessName: "",
  email: "",
  website: "",
  help: "",
  packageInterest: "",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 tracking-wide uppercase">
        {label}
        {required && <span className="text-fuchsia-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100 transition-all duration-200";

const selectCls = cn(inputCls, "appearance-none cursor-pointer");

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

function SuccessState({
  name,
  onReset,
}: {
  name: string;
  onReset: () => void;
}) {
  const firstName = name.split(" ")[0];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
      className="rounded-2xl bg-white border border-gray-200 overflow-hidden"
      style={{ boxShadow: "0 4px 32px rgba(217,70,239,0.10), 0 1px 4px rgba(0,0,0,0.06)" }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #d946ef, #a855f7, #6366f1)",
        }}
      />

      <div className="p-8 sm:p-10 flex flex-col items-center text-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/1launchlayer logo/launch layer logo.png"
            alt="1LaunchLayer"
            width={36}
            height={36}
            className="shrink-0"
          />
          <span className="text-gray-900 font-bold text-lg tracking-tight">
            1Launch<span className="text-fuchsia-500">Layer</span>
          </span>
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%)",
            border: "1px solid #e879f9",
          }}
        >
          <CheckCircle className="w-8 h-8 text-fuchsia-500" />
        </div>

        {/* Message */}
        <div>
          <h3 className="text-gray-900 font-extrabold text-2xl tracking-tight mb-2">
            Got it, {firstName}! 🎉
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Your enquiry is in. We'll review your details and reach out within{" "}
            <span className="text-gray-900 font-semibold">1 business day</span>{" "}
            to book your free discovery call.
          </p>
        </div>

        {/* What's next */}
        <div className="w-full rounded-xl bg-gray-50 border border-gray-100 p-5 text-left flex flex-col gap-3.5">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            What happens next
          </p>
          {[
            { icon: Phone, label: "We review your enquiry — usually same day" },
            { icon: Clock, label: "You'll hear from us within 1 business day" },
            { icon: CheckCircle, label: "We'll book your free 30-min discovery call" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-fuchsia-50 border border-fuchsia-200 flex items-center justify-center shrink-0 mt-px">
                <Icon className="w-3 h-3 text-fuchsia-500" />
              </div>
              <span className="text-gray-700 text-sm leading-snug">{label}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <a
            href="#packages"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-fuchsia-500 hover:bg-fuchsia-600 text-white text-sm font-bold rounded-full transition-colors shadow-md shadow-fuchsia-500/20 group"
          >
            View Packages
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <button
            onClick={onReset}
            className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-full transition-colors"
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
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      className="py-24 sm:py-32 relative overflow-hidden bg-gray-50"
    >
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <span className="section-label">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Tell us about your project
          </h2>
          <p className="mt-4 text-gray-600 text-base">
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
                className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 flex flex-col gap-5"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
              >
                {/* Name + Business */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your name" required>
                    <input
                      type="text"
                      required
                      placeholder="Alex Johnson"
                      value={form.name}
                      onChange={set("name")}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Business name" required>
                    <input
                      type="text"
                      required
                      placeholder="Acme Plumbing"
                      value={form.businessName}
                      onChange={set("businessName")}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Email address" required>
                  <input
                    type="email"
                    required
                    placeholder="alex@yourbusiness.com.au"
                    value={form.email}
                    onChange={set("email")}
                    className={inputCls}
                  />
                </Field>

                <Field label="Current website URL">
                  <input
                    type="text"
                    placeholder="https://yourbusiness.com.au (if you have one)"
                    value={form.website}
                    onChange={set("website")}
                    className={inputCls}
                  />
                </Field>

                <Field label="What do you need help with?" required>
                  <SelectWrapper>
                    <select
                      required
                      value={form.help}
                      onChange={set("help")}
                      className={selectCls}
                    >
                      <option value="" disabled>
                        Select an option...
                      </option>
                      {helpOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </SelectWrapper>
                </Field>

                <Field label="Package interest">
                  <SelectWrapper>
                    <select
                      value={form.packageInterest}
                      onChange={set("packageInterest")}
                      className={selectCls}
                    >
                      <option value="">Select a package...</option>
                      {packageOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </SelectWrapper>
                </Field>

                {/* Error */}
                {error && (
                  <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 inline-flex items-center justify-center gap-2 w-full py-4 bg-fuchsia-500 hover:bg-fuchsia-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-200 text-sm group shadow-lg shadow-fuchsia-500/20"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-gray-400 text-xs">
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
