import type { Metadata } from "next";
import { Footer, Header } from "@/components/site-shell";
import { getSiteOrigin } from "@/lib/site-origin";
import "./globals.css";

const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  ...(siteOrigin ? { metadataBase: siteOrigin } : {}),
  title: {
    default: "Matchids | Learn, imagine, create, give",
    template: "%s | Matchids",
  },
  description:
    "A welcoming space for children and families to discover books, creative activities, and ways to give back.",
  icons: {
    icon: [
      { url: "/logo/matchids-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/matchids-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/logo/matchids-icon-180.png",
  },
  openGraph: {
    title: "Matchids | Learn, imagine, create, give",
    description:
      "A welcoming space for children and families to discover books, creative activities, and ways to give back.",
    siteName: "Matchids",
    type: "website",
    ...(siteOrigin ? {
      images: [{ url: "/logo/matchids-logo.png", width: 1254, height: 1254, alt: "Official Matchids logo" }],
    } : {}),
  },
  twitter: {
    card: "summary",
    title: "Matchids | Learn, imagine, create, give",
    description:
      "A welcoming space for children and families to discover books, creative activities, and ways to give back.",
    ...(siteOrigin ? { images: ["/logo/matchids-logo.png"] } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}