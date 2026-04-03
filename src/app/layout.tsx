import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "1LaunchLayer | High-Converting Websites in 7 Days — Australia",
  description:
    "We build lead-generating websites for Australian service businesses. Live in 7 days. From $1,200.",
  keywords:
    "website design australia, web development, lead generation, service business website, 7 day website build, high converting website",
  openGraph: {
    title: "1LaunchLayer | High-Converting Websites in 7 Days — Australia",
    description:
      "We build lead-generating websites for Australian service businesses. Live in 7 days. From $1,200.",
    url: "https://1launchlayer.com.au",
    siteName: "1LaunchLayer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "1LaunchLayer — High-Converting Websites in 7 Days",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1LaunchLayer | High-Converting Websites in 7 Days — Australia",
    description:
      "We build lead-generating websites for Australian service businesses. Live in 7 days. From $1,200.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "1LaunchLayer",
  description:
    "We build high-converting websites for Australian service businesses. Live in 7 days.",
  url: "https://1launchlayer.com.au",
  email: "hello@1launchlayer.com.au",
  areaServed: "Australia",
  priceRange: "$$",
  serviceType: "Web Design & Development",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
