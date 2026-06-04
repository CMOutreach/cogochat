import { Card } from "@/components/ui/Card";

const reasons = [
  {
    icon: "🎯",
    title: "Built to convert, not just look good",
    description:
      "Every decision we make around layout, copy, colour and button placement is driven by one question: will this turn a visitor into an enquiry? A pretty website that does not convert is just an expensive brochure.",
  },
  {
    icon: "⚡",
    title: "Fast enough to keep visitors around",
    description:
      "We build on modern frameworks that load lightning fast on mobile. Google rewards fast sites with better rankings and your customers reward them by not leaving before the page loads.",
  },
  {
    icon: "🤝",
    title: "A real person, not a call centre",
    description:
      "When you reach out, you speak to someone who actually knows your project. No being passed around, no waiting days for someone to dig through notes. Quick answers from people who are across every detail.",
  },
  {
    icon: "🇬🇧",
    title: "Fully remote, anywhere in the world",
    description:
      "Fully remote via video calls and shared documents with no travel needed on either side. Whether you are in Cardiff, Glasgow, New York or anywhere else, the process and the quality are exactly the same.",
  },
  {
    icon: "🔒",
    title: "Fixed prices with no hidden fees",
    description:
      "You get a written quote before we start. The price we agree is the price you pay. No scope creep surprises, no add-ons you did not ask for and no awkward conversations at the end.",
  },
  {
    icon: "📈",
    title: "Cheaper than agencies. Better than DIY.",
    description:
      "Big agencies charge big agency prices. DIY builders give DIY results. We sit in the sweet spot. Professional, conversion-focused websites at a price that actually makes sense for a growing small business.",
  },
];

export function WhyCogochat() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            Why CogoChat
          </p>
          <h2 className="font-display text-4xl text-white lg:text-5xl">
            What makes us different
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            There are hundreds of web agencies out there. Most are too expensive, too slow
            or too generic. Here is why small businesses choose us instead.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <Card key={r.title} className="flex flex-col gap-4">
              <div className="text-3xl">{r.icon}</div>
              <h3 className="font-display text-xl text-white">{r.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{r.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
