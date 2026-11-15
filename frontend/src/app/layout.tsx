import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import PublicSiteExtras from "@/components/PublicSiteExtras";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.stemmantra.com'),
  title: {
    default: "STEMmantra - Robotics & AI Education for Schools | Master The Skills",
    template: "%s | STEMmantra",
  },
  description:
    "STEMmantra provides world-class robotics, AI, and STEM education solutions for schools. Setup STEAMVERSE Labs, Robotics Labs with expert training, NEP 2020 & NCF 2023 aligned curriculum, and innovative project-based learning. Training 1.5L+ students.",
  keywords: [
    "robotics education",
    "STEM learning",
    "AI robotics labs",
    "school robotics programs",
    "Atal Tinkering Labs",
    "ATL Labs setup",
    "coding for kids",
    "project-based learning",
    "STEM curriculum",
    "NEP 2020 education",
    "robotics lab for schools",
    "AI education",
    "IoT learning",
    "3D printing education",
  ],
  authors: [{ name: "STEMmantra" }],
  creator: "STEMmantra",
  publisher: "STEMmantra",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.stemmantra.com",
    title: "STEMmantra - Robotics & AI Education for Schools",
    description:
      "Master The Skills, Drive Your Future - Leading provider of robotics, AI, and STEM education solutions with ATL Labs setup and expert training. Training 1.5L+ students nationwide.",
    siteName: "STEMmantra",
    images: [
      {
        url: "https://learn.stemmantra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "STEMmantra Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STEMmantra - Robotics & AI Education for Schools",
    description:
      "Master The Skills, Drive Your Future - Leading provider of robotics, AI, and STEM education solutions.",
    images: ["https://learn.stemmantra.com/og-image.png"],
    creator: "@stemmantra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased w-full bg-transparent relative min-h-screen selection:bg-orange-200">
        {/* Global Decorative Light Pastel Backgrounds (Site Wide) */}
        <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
          {/* Top Right Orange Mesh */}
          <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-gradient-to-br from-orange-200/40 to-pink-200/40 rounded-full blur-[100px] mix-blend-multiply opacity-100 animate-blob" />
          {/* Middle Left Blue Mesh */}
          <div className="absolute top-[30%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tr from-blue-200/30 to-teal-200/30 rounded-full blur-[120px] mix-blend-multiply opacity-100 animate-blob animation-delay-2000" />
          {/* Bottom Right Pink Mesh */}
          <div className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] bg-gradient-to-bl from-pink-200/30 to-purple-200/30 rounded-full blur-[100px] mix-blend-multiply opacity-100 animate-blob animation-delay-4000" />
          {/* Grid Overlay for Texture */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
        </div>

        {/* JSON-LD Organization Schema for rich Google search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'STEMmantra',
              alternateName: 'STEM Mantra',
              url: 'https://www.stemmantra.com',
              logo: 'https://www.stemmantra.com/images/logo.png',
              description:
                'India\'s leading provider of robotics, AI, and STEM education solutions for schools. NEP 2020 & NCF 2023 aligned STEM labs, ATL setup, teacher training, and curriculum integration.',
              foundingDate: '2015',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'C-104, 2nd Floor, Sector-10',
                addressLocality: 'Noida',
                addressRegion: 'Uttar Pradesh',
                postalCode: '201301',
                addressCountry: 'IN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'info@stemmantra.com',
                availableLanguage: ['English', 'Hindi'],
              },
              sameAs: [
                'https://www.facebook.com/stemmantra',
                'https://www.instagram.com/stemmantra',
                'https://www.linkedin.com/company/stemmantra',
                'https://twitter.com/stemmantra',
              ],
              areaServed: {
                '@type': 'Country',
                name: 'India',
              },
              numberOfEmployees: {
                '@type': 'QuantitativeValue',
                minValue: 50,
              },
            }),
          }}
        />
        <Providers>
          <PublicSiteExtras />
          {children}
        </Providers>
      </body>
    </html>
  );
}
