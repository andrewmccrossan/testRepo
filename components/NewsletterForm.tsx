"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-sm border border-gold/60 bg-parchment-light/60 px-5 py-4 font-serif italic text-ink-soft">
        Thank you &mdash; a confirmation note is on its way.
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 border border-stone bg-parchment-light px-4 py-3 font-serif text-base text-ink placeholder:italic placeholder:text-stone-dark focus:border-gold focus:outline-none"
      />
      <button type="submit" className="btn-primary">
        Subscribe
      </button>
    </form>
  );
}
