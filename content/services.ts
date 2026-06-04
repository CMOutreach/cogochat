export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
  cta: string;
}

export const services: Service[] = [
  {
    slug: "web-design",
    title: "Web Design",
    tagline: "Websites that actually convert.",
    description:
      "We build fast, beautiful websites tailored to your business. Every page is built around turning visitors into leads and not just looking pretty.",
    icon: "🖥️",
    features: [
      "Custom design with no templates",
      "Mobile-first and fully responsive",
      "Lightning fast load times",
      "On-page SEO foundations included",
      "Contact forms and CTA integration",
      "1 month of post-launch support",
    ],
    price: "From £499",
    cta: "Get a free quote",
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    tagline: "One goal. One page. More leads.",
    description:
      "High-converting single-page campaigns for promotions, Google Ads or any campaign where you need to capture attention fast.",
    icon: "🎯",
    features: [
      "Conversion-first copywriting",
      "A/B testing ready",
      "Integrated with your CRM or email tool",
      "Built and live within 5 days",
      "Analytics and heatmap setup",
    ],
    price: "From £249",
    cta: "Start a campaign",
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    tagline: "Leads on autopilot.",
    description:
      "We set up the systems including forms, automations and follow-up sequences so enquiries flow in while you focus on your work.",
    icon: "⚡",
    features: [
      "Lead capture form strategy",
      "Email and SMS follow-up automation",
      "CRM setup and integration",
      "Monthly lead report",
      "Ongoing optimisation",
    ],
    price: "From £149/mo",
    cta: "Automate your leads",
  },
  {
    slug: "ads-management",
    title: "Ads Management",
    tagline: "Ad spend that works harder.",
    description:
      "Google and Meta ads managed by humans who care about your ROI and not just impressions. We handle the strategy, creative and reporting.",
    icon: "📈",
    features: [
      "Google Search and Display",
      "Meta (Facebook and Instagram)",
      "Keyword and audience research",
      "Weekly performance updates",
      "No long-term lock-in",
    ],
    price: "From £249/mo",
    cta: "Grow with ads",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
