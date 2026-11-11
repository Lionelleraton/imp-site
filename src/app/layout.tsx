import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ScrollReveal from "./components/ScrollReveal";
import CookieConsent from "./components/CookieConsent";
import HideOnLegalRoutes from "./components/HideOnLegalRoutes";

const getBaseUrl = () => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.trim().length > 0) {
    return explicit.replace(/\/+$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl && vercelUrl.trim().length > 0) {
    return `https://${vercelUrl.replace(/\/+$/, "")}`;
  }

  return "https://inmotionperformance.com";
};

const baseUrl = getBaseUrl();
const siteName = "InMotion Performance";
const siteTitle =
  "Photographe outdoor, sportif & événementiel · Chamonix, Mont-Blanc, Annecy";
const siteDescription =
  "Lionel Jouannaud, photographe outdoor, sportif et événementiel à Chamonix, dans le Pays du Mont-Blanc et à Annecy : courses, trail, ski, biathlon, soirées de marque et shootings produits. Galeries privées et devis en ligne.";

const keywords = [
  "photographe outdoor",
  "photographe événementiel",
  "photographe sportif",
  "photographe sport",
  "photographe Chamonix",
  "photographe Mont-Blanc",
  "photographe Annecy",
  "photographe Haute-Savoie",
  "photographe trail",
  "photographe ski",
  "photographe biathlon",
  "reportage sportif",
  "photographe de marque outdoor",
  "shooting produits outdoor",
  "photographe montagne",
];

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords,
  authors: [{ name: "Lionel Jouannaud" }],
  creator: "Lionel Jouannaud",
  category: "Photography",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/hero-social.jpg",
        width: 1200,
        height: 630,
        alt: "Photographe outdoor et sportif — Chamonix, Mont-Blanc, Annecy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/hero-social.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${baseUrl}/#photographe`,
      name: siteName,
      alternateName: "Lionel Jouannaud Photographe",
      description: siteDescription,
      url: baseUrl,
      image: `${baseUrl}/hero-social.jpg`,
      telephone: "+33 6 65 62 00 84",
      email: "inmotionperformance@icloud.com",
      priceRange: "€€",
      founder: { "@type": "Person", name: "Lionel Jouannaud" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "215 chemin des Favrands",
        addressLocality: "Chamonix-Mont-Blanc",
        postalCode: "74400",
        addressRegion: "Haute-Savoie",
        addressCountry: "FR",
      },
      areaServed: [
        { "@type": "Place", name: "Chamonix-Mont-Blanc" },
        { "@type": "Place", name: "Pays du Mont-Blanc" },
        { "@type": "Place", name: "Annecy" },
        { "@type": "Place", name: "Haute-Savoie" },
      ],
      knowsAbout: [
        "Photographie outdoor",
        "Photographie sportive",
        "Photographie événementielle",
        "Reportage de course",
        "Trail",
        "Ski",
        "Biathlon",
        "Shooting produits outdoor",
      ],
      sameAs: ["https://instagram.com/lionel_jouannaud"],
      makesOffer: [
        { "@type": "Offer", name: "Séance courte 2 h", price: "300", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Demi-journée", price: "450", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Journée", price: "750", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Shooting produits", price: "600", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Soirée de marque", price: "660", priceCurrency: "EUR" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      alternateName: "Lionel Jouannaud Photographe",
      url: baseUrl,
      inLanguage: "fr-FR",
    },
  ];

  return (
    <html lang="fr">
      <body className="min-h-screen bg-surface text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollReveal />
        <HideOnLegalRoutes>
          <SiteHeader />
        </HideOnLegalRoutes>
        {children}
        <HideOnLegalRoutes>
          <SiteFooter />
        </HideOnLegalRoutes>
        <CookieConsent />
      </body>
    </html>
  );
}
