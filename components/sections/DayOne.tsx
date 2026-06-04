export function DayOne() {
  const steps = [
    {
      step: "Day 1",
      icon: "📩",
      title: "Confirmation lands in your inbox",
      description: "A summary of everything we discussed, your fixed quote and your project timeline. All in one email so nothing gets lost.",
    },
    {
      step: "Day 2",
      icon: "🗓️",
      title: "Kickoff call booked",
      description: "A short call to go through the brief together, answer any questions and get everything we need from you before we start building.",
    },
    {
      step: "Week 1",
      icon: "🎨",
      title: "First design concepts shared",
      description: "You get a look at the design direction before anything is built. Feedback welcome. Changes included. No surprises.",
    },
    {
      step: "Week 2-3",
      icon: "🔨",
      title: "Build phase with progress updates",
      description: "We build your site on a private link so you can follow along. You will never be left wondering what is happening.",
    },
    {
      step: "Week 3-4",
      icon: "✅",
      title: "Review and sign off",
      description: "You check everything on your phone and desktop. We make any final tweaks. You say the word and we go live.",
    },
    {
      step: "Launch",
      icon: "🚀",
      title: "Live and handed over",
      description: "Your site is live, Google is notified, analytics are set up and every login is yours. Then we check in after 30 days to make sure everything is working.",
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            What to expect
          </p>
          <h2 className="font-display text-4xl text-white lg:text-5xl">
            What happens after you say yes
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            No vague timelines and no wondering what is going on. Here is exactly what lands in your world from the moment you sign off.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.step}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                  {s.step}
                </span>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <h3 className="font-display text-lg text-white">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
