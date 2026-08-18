/**
 * DEMO CONTENT — for local development only. See demo-books.ts for the
 * same convention: every entry is marked isDemoContent so it's easy to
 * find and clear before a real launch.
 */

export interface DemoArtwork {
  id: string;
  title: string;
  category:
    | "ANIMALS"
    | "COLORING"
    | "LEARNING"
    | "NATURE"
    | "STORIES"
    | "FANTASY"
    | "CREATIVE_ACTIVITIES";
  isDemoContent: true;
}

export const demoArtworks: DemoArtwork[] = [
  { id: "demo-art-1", title: "Sleepy Fox Coloring Page", category: "ANIMALS", isDemoContent: true },
  { id: "demo-art-2", title: "Rainbow Number Match", category: "LEARNING", isDemoContent: true },
  { id: "demo-art-3", title: "Under the Sea Coloring Page", category: "COLORING", isDemoContent: true },
  { id: "demo-art-4", title: "Build-a-Dragon Cutouts", category: "FANTASY", isDemoContent: true },
  { id: "demo-art-5", title: "Leaf Rubbing Activity", category: "NATURE", isDemoContent: true },
  { id: "demo-art-6", title: "Finish My Story: The Lost Balloon", category: "STORIES", isDemoContent: true },
];
