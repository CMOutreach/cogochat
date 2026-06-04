import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h1 className="font-display text-4xl text-white mb-8">Terms of Service</h1>
            <div className="prose prose-invert max-w-none text-white/60 space-y-6">
              <p><strong className="text-white">Last updated:</strong> January 2025</p>
              <p>By using CogoChat services you agree to these terms. Please read them carefully.</p>
              <h2 className="font-display text-2xl text-white">Services</h2>
              <p>CogoChat provides web design, landing page, lead generation, and advertising management services to businesses as described in our proposals and service agreements.</p>
              <h2 className="font-display text-2xl text-white">Payment</h2>
              <p>Projects require a 50% deposit before work begins. The remaining 50% is due before launch. Monthly services are billed at the start of each month.</p>
              <h2 className="font-display text-2xl text-white">Cancellation</h2>
              <p>Monthly services can be cancelled with 30 days&apos; written notice. Project deposits are non-refundable once work has commenced.</p>
              <h2 className="font-display text-2xl text-white">Intellectual property</h2>
              <p>On full payment, you own all website content and assets. We retain the right to display completed work in our portfolio unless otherwise agreed.</p>
              <h2 className="font-display text-2xl text-white">Limitation of liability</h2>
              <p>CogoChat&apos;s liability is limited to the amount paid for the relevant service. We are not liable for indirect or consequential losses.</p>
              <h2 className="font-display text-2xl text-white">Governing law</h2>
              <p>These terms are governed by the laws of England and Wales.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
