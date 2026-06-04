import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design, landing pages, lead generation and ads management for small businesses. Every service starts with a free audit.",
};

export default function ServicesPage() {
  return (
    <>
      <Hero
        badge="What we offer"
        headline="Everything a small business needs to grow online"
        subheadline="From a brand new website to a full lead generation system. Every service starts with a free audit so you know exactly what you need before you spend anything."
        primaryCta={{ label: "Get my free audit", href: "/contact" }}
      />
      <ServicesGrid />
      <CTABanner
        headline="Not sure which service you need?"
        subheadline="Start with the free audit. We will tell you exactly what your business needs and what would make the biggest difference."
        cta="Get my free audit"
      />
    </>
  );
}
