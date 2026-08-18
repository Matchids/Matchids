import { Section } from "@/components/home/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Matchids and founder Suzie Matchilda George.",
};

export default function AboutPage() {
  return (
    <>
      <Section
        eyebrow="About"
        title="Why Matchids exists"
        description="Matchids is an international digital platform for children, parents and communities — built around reading, imagination, creativity and giving back."
      />
      <Section
        className="bg-white"
        eyebrow="Founder"
        title="Suzie Matchilda George"
        description="Matchids was founded by Suzie Matchilda George, with a vision for a platform where children's education and creativity are treated with the same care as their safety and joy."
      />
    </>
  );
}
