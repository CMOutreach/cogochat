export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight: boolean;
  cta: string;
}

export const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "£499",
    period: "one-off",
    description: "Get a clean, professional website live fast. Perfect for businesses starting out online.",
    features: [
      "Up to 5 pages",
      "Custom responsive design",
      "Contact form + click-to-call",
      "On-page SEO basics",
      "Google Analytics setup",
      "1 month of free support",
    ],
    highlight: false,
    cta: "Get started",
  },
  {
    name: "Growth",
    price: "£899",
    period: "one-off + £149/mo",
    description: "A full website plus the marketing to keep leads coming in every month.",
    features: [
      "Everything in Starter",
      "Up to 10 pages",
      "Lead generation setup",
      "2 blog posts per month",
      "Email follow-up sequence",
      "Monthly performance report",
    ],
    highlight: true,
    cta: "Most popular — let's talk",
  },
  {
    name: "Pro",
    price: "£349/mo",
    period: "per month",
    description: "Full-service marketing for businesses ready to scale. No contracts, cancel anytime.",
    features: [
      "Everything in Growth",
      "Google / Meta ads management",
      "Weekly reporting & calls",
      "A/B tested landing pages",
      "Priority support",
      "No long-term contract",
    ],
    highlight: false,
    cta: "Scale with us",
  },
];
