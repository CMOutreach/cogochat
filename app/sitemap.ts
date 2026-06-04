import { MetadataRoute } from "next";
import { services } from "@/content/services";
import { portfolio } from "@/content/portfolio";

const base = "https://cogochat.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: base, priority: 1.0 },
    { url: `${base}/services`, priority: 0.9 },
    { url: `${base}/portfolio`, priority: 0.8 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/pricing`, priority: 0.8 },
    { url: `${base}/process`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.9 },
    { url: `${base}/faq`, priority: 0.6 },
    { url: `${base}/blog`, priority: 0.8 },
  ].map((p) => ({ ...p, lastModified: new Date(), changeFrequency: "monthly" as const }));

  const servicePages = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const portfolioPages = portfolio.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...portfolioPages];
}
