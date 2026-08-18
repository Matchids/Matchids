import { PrismaClient } from "@prisma/client";
import { demoBooks } from "../src/data/demo-books";
import { demoArtworks } from "../src/data/demo-artworks";

const prisma = new PrismaClient();

/**
 * Seeds ONLY demo/dev content, and refuses to run in production so a real
 * deployment never ends up with placeholder books or art in its catalog.
 */
async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Refusing to run the demo seed script in production.");
  }

  for (const book of demoBooks) {
    await prisma.book.upsert({
      where: { id: book.id },
      update: {},
      create: {
        id: book.id,
        title: book.title,
        description: book.description,
        author: book.author,
        language: book.language,
        ageRangeMin: book.ageRange[0],
        ageRangeMax: book.ageRange[1],
        accessType: book.accessType,
        priceCents: book.priceCents,
        isDemoContent: true,
      },
    });
  }

  for (const art of demoArtworks) {
    await prisma.artwork.upsert({
      where: { id: art.id },
      update: {},
      create: {
        id: art.id,
        title: art.title,
        category: art.category,
        isDemoContent: true,
      },
    });
  }

  console.log(`Seeded ${demoBooks.length} demo books and ${demoArtworks.length} demo artworks.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
