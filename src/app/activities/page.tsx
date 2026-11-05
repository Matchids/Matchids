import type { Metadata } from "next";
import Link from "next/link";
import { ReadingActivity } from "@/components/reading-activity";
import { readingActivity } from "@/data/reading-activity";

export const metadata: Metadata = {
  title: "Learning Activities",
  description: "Try an original reading-comprehension activity from Matchids.",
  alternates: { canonical: "/activities" },
};

export default function ActivitiesPage() {
  return (
    <section className="page-wrap catalog-page">
      <div className="section-heading">
        <p className="eyebrow">Imagine and learn</p>
        <h1>Take a closer look at the story.</h1>
        <p>This short reading activity is original Matchids starter content. It runs in this page only; answers are not saved.</p>
      </div>
      <div className="activity-heading">
        <div>
          <p className="eyebrow">Reading comprehension · Ages {readingActivity.ageRange}</p>
          <h2>{readingActivity.title}</h2>
          <p>{readingActivity.introduction}</p>
        </div>
        <span className="activity-duration">About {readingActivity.estimatedMinutes} minutes</span>
      </div>
      <ReadingActivity passage={readingActivity.passage} questions={readingActivity.questions} />
      <p className="contact-note">Looking for more? Only approved Kids Art is shown publicly. <Link href="/kids-art">Explore Kids Art</Link>.</p>
    </section>
  );
}