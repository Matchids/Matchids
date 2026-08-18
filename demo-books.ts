/**
 * DEMO CONTENT — for local development only.
 *
 * These books do not exist in Matchids' real catalog. Every record is
 * marked isDemoContent: true so it's trivial to find and delete once real
 * books are loaded through the admin dashboard. Never seed production
 * with this file.
 */

export interface DemoBook {
  id: string;
  title: string;
  description: string;
  author: string;
  language: "en" | "fr" | "ht";
  ageRange: [number, number];
  accessType: "FREE" | "PREMIUM";
  priceCents: number;
  category: string;
  isDemoContent: true;
}

export const demoBooks: DemoBook[] = [
  {
    id: "demo-book-1",
    title: "The Kite That Learned to Wait",
    description:
      "A gentle story about patience, following a paper kite grounded by a windless week.",
    author: "Demo Author",
    language: "en",
    ageRange: [4, 7],
    accessType: "FREE",
    priceCents: 0,
    category: "stories",
    isDemoContent: true,
  },
  {
    id: "demo-book-2",
    title: "Counting Mangoes",
    description: "An early-math picture book set in a backyard mango tree.",
    author: "Demo Author",
    language: "en",
    ageRange: [3, 6],
    accessType: "FREE",
    priceCents: 0,
    category: "learning",
    isDemoContent: true,
  },
  {
    id: "demo-book-3",
    title: "Where the River Bends",
    description: "A longer illustrated adventure for confident young readers.",
    author: "Demo Author",
    language: "en",
    ageRange: [8, 11],
    accessType: "PREMIUM",
    priceCents: 499,
    category: "fantasy",
    isDemoContent: true,
  },
  {
    id: "demo-book-4",
    title: "Ti Chat ak Gwo Lalin nan",
    description: "Yon istwa dodo dous sou yon ti chat ki pè fè nwit.",
    author: "Demo Author",
    language: "ht",
    ageRange: [3, 6],
    accessType: "FREE",
    priceCents: 0,
    category: "stories",
    isDemoContent: true,
  },
];
