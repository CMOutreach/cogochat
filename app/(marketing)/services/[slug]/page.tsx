import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-6 text-5xl">{service.icon}</div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            {service.price}
          </p>
          <h1 className="font-display text-5xl text-white mb-6 lg:text-6xl">{service.title}</h1>
          <p className="text-xl text-brand-300 font-display italic mb-6">{service.tagline}</p>
          <p className="text-lg text-white/55 leading-relaxed mb-12">{service.description}</p>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-10">
            <h2 className="font-display text-2xl text-white mb-6">What&apos;s included</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-white/70">
                  <span className="text-brand-400 mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <Button href="/contact" size="lg">{service.cta} →</Button>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
