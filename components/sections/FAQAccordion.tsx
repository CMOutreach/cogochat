"use client";
import { useState } from "react";
import { faqs } from "@/content/faq";
import { cn } from "@/lib/cn";

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">FAQ</p>
          <h2 className="font-display text-4xl text-white lg:text-5xl">Common questions</h2>
        </div>

        <div className="flex flex-col divide-y divide-white/8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-medium leading-snug">{faq.question}</span>
                <span
                  className={cn(
                    "mt-0.5 shrink-0 text-brand-400 text-lg leading-none transition-transform",
                    open === i && "rotate-45"
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  open === i ? "max-h-48 pb-5" : "max-h-0"
                )}
              >
                <p className="text-sm text-white/55 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
