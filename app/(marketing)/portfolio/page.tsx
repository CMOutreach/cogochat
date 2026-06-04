import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Real results for real businesses. See how CogoChat has helped local businesses grow online.",
};

export default function PortfolioPage() {
  return (
    <>
      <Hero
        badge="Case studies"
        headline="Results that speak for themselves"
        subheadline="Real businesses. Real numbers. No vanity metrics."
        primaryCta={{ label: "Start your project →", href: "/contact" }}
      />
      <PortfolioGrid />
      <CTABanner headline="Want results like these?" subheadline="Let's talk about your business." />
    </>
  );
}
