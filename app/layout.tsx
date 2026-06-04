import type { Metadata } from "next";
import { LocalBusinessSchema } from "@/components/seo/StructuredData";
import { LiveChat } from "@/components/sections/LiveChat";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "CogoChat | Websites and Marketing for Small Businesses",
    template: "%s | CogoChat",
  },
  description:
    "CogoChat helps small and independent businesses get found online, convert visitors into leads, and grow. Free consultation with no obligation.",
  metadataBase: new URL("https://cogochat.com"),
  openGraph: {
    siteName: "CogoChat",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="grain">
        <LocalBusinessSchema />
        {children}
        <LiveChat />
      </body>
    </html>
  );
}
