import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Matchids — A Digital World Where Children Learn, Imagine, Create and Give",
    template: "%s · Matchids",
  },
  description:
    "Matchids is an international digital platform for children, parents and communities — books, creativity, and a Give Back program supporting children who need it most.",
  openGraph: {
    title: "Matchids",
    description: "A Digital World Where Children Learn, Imagine, Create and Give",
    siteName: "Matchids",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matchids",
    description: "A Digital World Where Children Learn, Imagine, Create and Give",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${baloo.variable} ${jakarta.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
