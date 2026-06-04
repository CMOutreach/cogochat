export interface PortfolioItem {
  slug: string;
  client: string;
  industry: string;
  location: string;
  services: string[];
  challenge: string;
  solution: string;
  result: string;
  stats: { label: string; value: string }[];
  image: string;
}

export const portfolio: PortfolioItem[] = [
  {
    slug: "booth-solicitors",
    client: "Booth & Co Solicitors",
    industry: "Legal",
    location: "Swansea",
    services: ["Web Design", "Lead Generation"],
    challenge: "Outdated website with no clear CTA and zero online enquiries.",
    solution: "Complete redesign with a conversion-focused homepage, service pages, and automated enquiry follow-up.",
    result: "Enquiry form submissions doubled in the first 30 days.",
    stats: [
      { label: "Enquiry increase", value: "+110%" },
      { label: "Bounce rate drop", value: "-38%" },
      { label: "Time to launch", value: "12 days" },
    ],
    image: "/portfolio/booth-solicitors.jpg",
  },
  {
    slug: "davies-plumbing",
    client: "Davies Plumbing Services",
    industry: "Trades",
    location: "Cardiff",
    services: ["Web Design", "Landing Pages", "Lead Generation"],
    challenge: "No digital presence. All work came from word-of-mouth with unpredictable pipeline.",
    solution: "New website, an emergency callout landing page, and a lead capture funnel with automated SMS follow-up.",
    result: "3–5 qualified leads per week within 6 weeks of launch.",
    stats: [
      { label: "Weekly leads", value: "3–5" },
      { label: "Cost per lead", value: "£12" },
      { label: "ROI in month 1", value: "4×" },
    ],
    image: "/portfolio/davies-plumbing.jpg",
  },
  {
    slug: "patel-dental",
    client: "Patel Dental Practice",
    industry: "Healthcare",
    location: "Newport",
    services: ["Web Design", "Ads Management"],
    challenge: "Low new patient registrations and a website that wasn't mobile-friendly.",
    solution: "Mobile-first redesign, online booking integration, and Google Ads campaign targeting new patients within 10 miles.",
    result: "60% of bookings now come through mobile; 22 new patients in the first month of ads.",
    stats: [
      { label: "Mobile bookings", value: "60%" },
      { label: "New patients (mo 1)", value: "22" },
      { label: "Cost per booking", value: "£18" },
    ],
    image: "/portfolio/patel-dental.jpg",
  },
];
