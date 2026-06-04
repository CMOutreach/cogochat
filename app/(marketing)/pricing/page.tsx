import type { Metadata } from "next";
import { PricingTable } from "@/components/sections/PricingTable";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, honest pricing for web design and marketing. No hidden fees, no long-term contracts.",
};

export default function PricingPage() {
  return (
    <>
      <section className="py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-4">Pricing</p>
          <h1 className="font-display text-5xl text-white lg:text-6xl">
            Honest prices. No surprises.
          </h1>
          <p className="mt-4 text-white/50">
            Fixed quotes. No hidden fees. Cancel monthly plans anytime with 30 days&apos; notice.
          </p>
        </div>
      </section>
      <PricingTable />
      <FAQAccordion />
      <CTABanner headline="Still not sure? Let's talk." subheadline="Tell us what you need and we'll find the right fit." />
    </>
  );
}
