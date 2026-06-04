const steps = [
  {
    number: "01",
    title: "Discovery call",
    description:
      "A free 30-minute call to understand your business, your goals, and what's holding you back online.",
  },
  {
    number: "02",
    title: "Proposal & scope",
    description:
      "We send a clear proposal with timeline, deliverables, and fixed pricing. No vague estimates.",
  },
  {
    number: "03",
    title: "Design & build",
    description:
      "We get to work. You get progress updates and a staging site to review before anything goes live.",
  },
  {
    number: "04",
    title: "Launch & grow",
    description:
      "Your site goes live. We set up analytics, submit your sitemap, and hand over everything you need.",
  },
];

export function ProcessSteps() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            The process
          </p>
          <h2 className="font-display text-4xl text-white lg:text-5xl">
            From enquiry to live in weeks
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-brand-500/40 to-transparent -z-10" />
              )}
              <div className="font-display text-5xl text-brand-500/20 mb-4">{step.number}</div>
              <h3 className="font-display text-xl text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
