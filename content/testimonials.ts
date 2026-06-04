export interface Testimonial {
  name: string;
  business: string;
  location: string;
  quote: string;
  result: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Booth",
    business: "Booth & Co Solicitors",
    location: "Swansea",
    quote:
      "CogoChat rebuilt our site in two weeks and our enquiry form submissions doubled within the first month. Can't recommend them enough.",
    result: "2× more enquiries",
  },
  {
    name: "Mark Davies",
    business: "Davies Plumbing Services",
    location: "Cardiff",
    quote:
      "I was getting zero leads from my old website. Now I get 3–5 genuine enquiries a week and I'm turning work away.",
    result: "5 leads/week",
  },
  {
    name: "Priya Patel",
    business: "Patel Dental Practice",
    location: "Newport",
    quote:
      "Professional, fast, and they actually explained everything in plain English. The new site looks incredible on mobile.",
    result: "60% mobile bookings",
  },
  {
    name: "Tom Ellis",
    business: "Ellis Roofing Ltd",
    location: "Llanelli",
    quote:
      "Their landing page for our summer campaign generated more leads in 6 weeks than our old site did in a whole year.",
    result: "40 leads in 6 weeks",
  },
];
