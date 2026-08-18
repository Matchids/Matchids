import { Section } from "@/components/home/Section";
import { demoArtworks } from "@/data/demo-artworks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kids Art",
  description: "Coloring pages, activities and creative prompts for children.",
};

const categoryLabels: Record<string, string> = {
  ANIMALS: "Animals",
  COLORING: "Coloring",
  LEARNING: "Learning",
  NATURE: "Nature",
  STORIES: "Stories",
  FANTASY: "Fantasy",
  CREATIVE_ACTIVITIES: "Creative Activities",
};

export default function KidsArtPage() {
  return (
    <Section
      eyebrow="Kids Art"
      title="Color, imagine, create"
      description="Activities organized into gentle categories. New ones are added regularly."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {demoArtworks.map((art) => (
          <div key={art.id} className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
            <div className="flex h-32 items-center justify-center bg-gradient-to-br from-violet/15 via-coral/15 to-gold/15 text-3xl" aria-hidden="true">
              🖍️
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-violet">
                {categoryLabels[art.category]}
              </span>
              <h3 className="mt-1 font-display text-base font-bold text-ink">{art.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
