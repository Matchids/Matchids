import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedArtworks } from "@/lib/catalog";

interface ArtworkPageProps { params: { id: string } }

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const artwork = (await getPublishedArtworks()).find((item) => item.id === params.id);
    return {
      title: artwork?.title ?? "Activity not found",
      description: artwork?.description ?? undefined,
      alternates: { canonical: `/kids-art/${params.id}` },
    };
}

export default async function ArtworkDetailPage({ params }: ArtworkPageProps) {
  const artwork = (await getPublishedArtworks()).find((item) => item.id === params.id);
  if (!artwork) notFound();

  return (
    <section className="page-wrap detail-page">
      <Link className="back-link" href="/kids-art">← Kids Art</Link>
      <div className="detail-copy">
        <p className="eyebrow">Reviewed activity</p>
        <h1>{artwork.title}</h1>
        {artwork.description && <p className="detail-description">{artwork.description}</p>}
        <p className="availability-note">Activity instructions and downloadable materials have not been added yet.</p>
      </div>
    </section>
  );
}