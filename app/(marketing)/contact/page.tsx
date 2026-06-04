import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Book a Free Audit",
  description: "Book a free audit with CogoChat. We will look at your business online and tell you exactly what we would do to get you more customers.",
};

export default function ContactPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-4">Free audit</p>
            <h1 className="font-display text-5xl text-white mb-6 lg:text-6xl">
              Find out what your website is costing you
            </h1>
            <p className="text-white/55 leading-relaxed mb-4">
              Fill in the form and one of our team will be in touch within one business day to arrange a short call.
              We will gather a few details about your business, go away and do a proper audit of your online presence,
              then come back to you with exactly what we found and what we would do about it.
            </p>
            <p className="text-white/55 leading-relaxed mb-12">
              The whole thing is free. No obligation to go further and no pitch on the first call.
              Just honest, useful information about where your business stands online.
            </p>

            <div className="flex flex-col gap-6">
              {[
                {
                  icon: "📞",
                  title: "Call one — we learn about your business",
                  desc: "A short 10-minute call to understand your business and what you are looking for",
                },
                {
                  icon: "🔍",
                  title: "We do the audit",
                  desc: "We go through your website, your Google presence and your competitors in your area",
                },
                {
                  icon: "📋",
                  title: "Call two — we share what we found",
                  desc: "We come back with a clear breakdown of what is holding you back and how to fix it",
                },
                {
                  icon: "🚀",
                  title: "You decide what happens next",
                  desc: "No pressure. If you want to work with us we send a proposal. If not, keep the audit findings",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-sm text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
