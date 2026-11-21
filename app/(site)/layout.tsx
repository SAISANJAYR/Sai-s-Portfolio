import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./site.css";
import SiteNav from "@/components/site/SiteNav";
import SmoothScroll from "@/components/site/SmoothScroll";
import RevealObserver from "@/components/site/RevealObserver";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://saisanjay-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SaiSanjay R — AI & Data Science",
    template: "%s — SaiSanjay R",
  },
  description:
    "SaiSanjay R — computer science student in Coimbatore building agentic AI, backend systems and neural networks from first principles. Engineering Intern at Forge Innovations & Ventures; AI & Vision at Qbotix Rover Team.",
  authors: [{ name: "SaiSanjay R", url: siteUrl }],
  openGraph: {
    type: "website",
    siteName: "SaiSanjay R",
    title: "SaiSanjay R — AI & Data Science",
    description: "Agentic AI, backend systems and neural networks from first principles.",
    url: siteUrl,
    images: [{ url: "/my_profile.png", width: 896, height: 1195, alt: "Portrait of SaiSanjay R" }],
  },
  twitter: { card: "summary", title: "SaiSanjay R — AI & Data Science" },
};

export const viewport: Viewport = {
  themeColor: "#F1EBDD",
  colorScheme: "light",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} no-js`}
      suppressHydrationWarning
    >
      <head>
        {/* swap no-js → js before paint so reveal states never flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.replace('no-js','js')",
          }}
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        <SmoothScroll />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
