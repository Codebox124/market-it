"use client";

import { useState } from "react";
import type { HomeFormStrings } from "@/components/home/homeStrings";

const DEFAULT_STRINGS: HomeFormStrings = {
  name: "Your name",
  namePh: "Full name",
  email: "Work email",
  emailPh: "you@company.com",
  company: "Company",
  companyPh: "Company or organisation",
  details: "Project details",
  detailsPh: "What are you building, and what does it need to achieve?",
  submit: "Send Inquiry",
  note: "This opens your email app with the message addressed to us — nothing is sent until you press send.",
  subjectPrefix: "New inquiry",
  bodyName: "Name",
  bodyEmail: "Email",
  bodyCompany: "Company",
  bodyDetails: "Project details",
};

const inputClass =
  "w-full bg-[color:var(--color-surface)] border border-[color:var(--color-line-strong)] px-4 py-3.5 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] focus:outline-none focus:border-[color:var(--color-gold)] transition-colors duration-300";

const labelClass =
  "block text-[0.7rem] font-medium tracking-[0.24em] uppercase text-[color:var(--color-ink-soft)] mb-2.5";

export default function EnquiryForm({ strings = DEFAULT_STRINGS }: { strings?: HomeFormStrings }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${strings.subjectPrefix} — ${name}${company ? ` (${company})` : ""}`
    );
    const body = encodeURIComponent(
      `${strings.bodyName}: ${name}\n${strings.bodyEmail}: ${email}\n${strings.bodyCompany}: ${company}\n\n${strings.bodyDetails}:\n${details}`
    );
    window.location.href = `mailto:info@makeitandmarket.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="enquiry-name" className={labelClass}>
            {strings.name}
          </label>
          <input
            id="enquiry-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={strings.namePh}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="enquiry-email" className={labelClass}>
            {strings.email}
          </label>
          <input
            id="enquiry-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={strings.emailPh}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-company" className={labelClass}>
          {strings.company}
        </label>
        <input
          id="enquiry-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={strings.companyPh}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="enquiry-details" className={labelClass}>
          {strings.details}
        </label>
        <textarea
          id="enquiry-details"
          required
          rows={5}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={strings.detailsPh}
          className={`${inputClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-8 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[#0b0b0d] bg-[color:var(--color-gold)] hover:bg-[color:var(--color-gold-strong)] transition-colors duration-300"
      >
        {strings.submit}
      </button>
      <p className="text-sm text-[color:var(--color-ink-muted)]">
        {strings.note}
      </p>
    </form>
  );
}
