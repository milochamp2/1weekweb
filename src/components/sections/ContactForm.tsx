"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";
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
      <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">
        {label}
        {required && <span className="text-fuchsia-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/[0.07] text-white text-sm placeholder-zinc-600 outline-none focus:border-fuchsia-500/50 focus:bg-zinc-800/80 transition-all duration-200";

const selectCls = cn(
  inputCls,
  "appearance-none cursor-pointer"
);

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
      />
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "rgba(24,24,27,0.4)" }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,70,239,0.07) 0%, transparent 70%)",
        }}
      />

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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tell us about your project
          </h2>
          <p className="mt-4 text-zinc-400 text-base">
            We&apos;ll be in touch within 1 business day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {submitted ? (
            <div
              className="rounded-2xl bg-zinc-900 border border-fuchsia-500/25 p-12 text-center flex flex-col items-center gap-5"
              style={{ boxShadow: "0 0 60px -15px rgba(217,70,239,0.25)" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(217,70,239,0.1)",
                  boxShadow: "0 0 30px -6px rgba(217,70,239,0.4)",
                }}
              >
                <CheckCircle2 className="w-8 h-8 text-fuchsia-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-2">
                  Message received!
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                  Thanks for reaching out. We&apos;ll review your details and be
                  in touch within 1 business day to schedule your free discovery
                  call.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm(initialState);
                }}
                className="text-fuchsia-400 hover:text-fuchsia-300 text-sm underline underline-offset-4 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-zinc-900 border border-white/[0.07] p-6 sm:p-8 flex flex-col gap-5"
              style={{ boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)" }}
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
                  type="url"
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
                      <option key={o} value={o} style={{ background: "#18181b" }}>
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
                    <option value="" style={{ background: "#18181b" }}>
                      Select a package...
                    </option>
                    {packageOptions.map((o) => (
                      <option key={o} value={o} style={{ background: "#18181b" }}>
                        {o}
                      </option>
                    ))}
                  </select>
                </SelectWrapper>
              </Field>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex items-center justify-center gap-2 w-full py-4 bg-fuchsia-500 hover:bg-fuchsia-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-200 text-sm group"
                style={{ boxShadow: "0 0 30px -6px rgba(217,70,239,0.45)" }}
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

              <p className="text-center text-zinc-600 text-xs">
                We respond within 1 business day. No spam, ever.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
