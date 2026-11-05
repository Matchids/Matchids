import type { Metadata } from "next";
import { getPublishedArtworks } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Kids Art",
  description: "Creative activities and artwork published for children and families.",
  alternates: { canonical: "/kids-art" },
};

export const dynamic = "force-dynamic";

const labels: Record<string, string> = {
  ANIMALS: "Animals",
  COLORING: "Coloring",
  LEARNING: "Learning",
  NATURE: "Nature",
  STORIES: "Stories",
  FANTASY: "Fantasy",
  CREATIVE_ACTIVITIES: "Creative activities",
};

export default async function KidsArtPage() {
  const artworks = await getPublishedArtworks();
  return (
    <section className="page-wrap catalog-page">
      <div className="section-heading">
        <p className="eyebrow">Kids Art</p>
        <h1>Make room for imagination</h1>
        <p>Creative activities and artwork will appear here after review and publication.</p>
      </div>
      {artworks.length ? (
        <div className="art-grid">
          {artworks.map((artwork) => (
            <article className="art-card" key={artwork.id}>
              {artwork.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={artwork.imageUrl} alt={artwork.title} loading="lazy" />
              ) : <div className="art-image-empty">Activity image not supplied</div>}
              <p className="eyebrow">{labels[artwork.category] ?? "Creative activity"}</p>
              <h2>{artwork.title}</h2>
              {artwork.description && <p>{artwork.description}</p>}
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No activities published yet</h2>
          <p>Only content approved for publication appears here. Check back as the reviewed library grows.</p>
        </div>
      )}
    </section>
  );
}