import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h1 className="font-display text-4xl text-white mb-8">Privacy Policy</h1>
            <div className="prose prose-invert max-w-none text-white/60 space-y-6">
              <p><strong className="text-white">Last updated:</strong> January 2025</p>
              <p>CogoChat (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights.</p>
              <h2 className="font-display text-2xl text-white">What we collect</h2>
              <p>When you fill in our contact form, we collect your name, email address, phone number, and any information you choose to share. We use this solely to respond to your enquiry.</p>
              <h2 className="font-display text-2xl text-white">How we use your data</h2>
              <p>We never sell your data. We use it to respond to enquiries, send project updates, and (with your consent) occasional marketing emails. You can unsubscribe at any time.</p>
              <h2 className="font-display text-2xl text-white">Cookies</h2>
              <p>We use Google Analytics to understand how visitors use our site. This uses anonymised cookies. You can opt out via your browser settings.</p>
              <h2 className="font-display text-2xl text-white">Your rights</h2>
              <p>Under UK GDPR you have the right to access, correct, or delete your data. Email us at hello@cogochat.co.uk to exercise these rights.</p>
              <h2 className="font-display text-2xl text-white">Contact</h2>
              <p>CogoChat, Llanelli, Wales. hello@cogochat.co.uk</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
