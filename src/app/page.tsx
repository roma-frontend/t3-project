import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap justify-center gap-4">
        {[...images, ...images, ...images].map((image, index) => (
          <div
            key={image.id + "_" + index}
            className="flex w-48 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-md"
          >
            <Image
              src={image.url}
              alt={image.name}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
