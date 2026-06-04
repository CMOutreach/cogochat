import Link from "next/link";
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl text-brand-500/20 mb-4">404</p>
      <h1 className="font-display text-3xl text-white mb-3">Page not found</h1>
      <p className="text-white/50 mb-8">This page doesn&apos;t exist—but your next website will.</p>
      <Link href="/" className="text-brand-400 hover:text-brand-300 underline underline-offset-4">
        Back to home
      </Link>
    </main>
  );
}
