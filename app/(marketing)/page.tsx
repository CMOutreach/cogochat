import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyCogochat } from "@/components/sections/WhyCogochat";
import { SiteIsProof } from "@/components/sections/SiteIsProof";
import { Guarantee } from "@/components/sections/Guarantee";
import { DayOne } from "@/components/sections/DayOne";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "CogoChat | Websites and Marketing for Small Businesses",
  description:
    "Find out exactly what your website is costing you, free. CogoChat audits your online presence and builds websites that actually bring in customers.",
};

export default function HomePage() {
  return (
    <>
      <Hero
        badge="Free audit for small businesses"
        headline="Find out exactly what your website is costing you"
        subheadline="We audit your online presence for free, tell you honestly what is holding you back, then build you something that actually brings in customers. No obligation, no hard sell."
        primaryCta={{ label: "Get my free audit", href: "/contact" }}
        secondaryCta={{ label: "See how it works", href: "/process" }}
        stats={[
          { value: "Free", label: "Full website audit" },
          { value: "Lightning fast", label: "Every site we build" },
          { value: "Zero", label: "Tie-in contracts" },
        ]}
      />
      <ServicesGrid />
      <Guarantee />
      <WhyCogochat />
      <DayOne />
      <SiteIsProof />
      <ProcessSteps />
      <CTABanner
        headline="Find out what your website is costing you"
        subheadline="Free audit, two calls, no obligation. You walk away knowing exactly where your business stands online whether you work with us or not."
        cta="Get my free audit"
      />
    </>
  );
}
