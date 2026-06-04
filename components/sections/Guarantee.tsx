import { Card } from "@/components/ui/Card";

const guarantees = [
  {
    icon: "🎨",
    title: "Design you love or we redo it",
    description:
      "After your first design review, if you are not happy with the direction we have taken, we go back to the drawing board at no extra cost. We would rather get it right than get it done.",
  },
  {
    icon: "📅",
    title: "We hit the timeline or we explain why",
    description:
      "Every project gets a written timeline before we start. If something changes on our end that affects the schedule, you hear about it immediately. No silences, no excuses after the fact.",
  },
  {
    icon: "🔑",
    title: "You own everything from day one",
    description:
      "Your domain, your hosting account, your website files. Everything is in your name and under your control. If you ever decide to move on, we will help you do it cleanly.",
  },
];

export function Guarantee() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            Our guarantees
          </p>
          <h2 className="font-display text-4xl text-white lg:text-5xl">
            We put it in writing
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Most agencies ask you to trust them. We back it up.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {guarantees.map((g) => (
            <Card key={g.title} className="flex flex-col gap-4 border-brand-500/20">
              <div className="text-3xl">{g.icon}</div>
              <h3 className="font-display text-xl text-white">{g.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{g.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
