import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Providers from "@/providers";
import FloatingDemoButton from "@/components/ui/FloatingDemoButton";

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
  title: {
    default: "STEM Mantra - Robotics & AI Education for Schools | Master The Skills",
    template: "%s | STEM Mantra",
  },
  description:
    "STEM Mantra provides world-class robotics, AI, and STEM education solutions for schools. Setup ATL Labs, Robotics Labs with expert training, NEP 2020 aligned curriculum, and innovative project-based learning.",
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
  authors: [{ name: "STEM Mantra" }],
  creator: "STEM Mantra",
  publisher: "STEM Mantra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.stemmantra.com",
    title: "STEM Mantra - Robotics & AI Education for Schools",
    description:
      "Master The Skills Drive Your Future - Leading provider of robotics, AI, and STEM education solutions with ATL Labs setup and expert training.",
    siteName: "STEM Mantra",
  },
  twitter: {
    card: "summary_large_image",
    title: "STEM Mantra - Robotics & AI Education for Schools",
    description:
      "Master The Skills Drive Your Future - Leading provider of robotics, AI, and STEM education solutions.",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <SmoothScroll />
          {children}
          <FloatingDemoButton />
        </Providers>
      </body>
    </html>
  );
}
