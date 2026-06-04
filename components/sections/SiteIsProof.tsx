import { Button } from "@/components/ui/Button";

export function SiteIsProof() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-8 py-16 lg:px-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-brand-500/8 blur-[80px]" />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-4">
                Our work
              </p>
              <h2 className="font-display text-4xl text-white mb-6 lg:text-5xl">
                You are looking at it right now
              </h2>
              <p className="text-white/55 leading-relaxed mb-6">
                This website, the one you are browsing, was designed and built entirely by CogoChat.
                The speed, the layout, the mobile experience and the conversion flow. This is exactly
                what we build for our clients.
              </p>
              <p className="text-white/55 leading-relaxed mb-8">
                If you like what you see, imagine it with your brand, your services and your customers in mind.
                That is what we do.
              </p>
              <Button href="/contact" size="lg">
                Get something like this
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Pages on this site", value: "11" },
                { label: "Load speed", value: "Lightning fast" },
                { label: "Mobile optimised", value: "100%" },
                { label: "Built in", value: "Wales 🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
                >
                  <div className="font-display text-3xl text-brand-400 mb-2">{stat.value}</div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
