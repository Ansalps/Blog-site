import { Suspense } from "react";
import { prisma } from "@/app/lib/prisma";


// Tell Next.js which slugs exist so it can pre-render or cache them safely
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Separate async component that receives and awaits the params promise
async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    
  });

  return (
    <>
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </>
  );
}

// Main page component passes the params promise down without awaiting it
export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <Suspense fallback={<p className="text-gray-500">Loading post...</p>}>
        <PostContent params={params} />
      </Suspense>
    </main>
  );
}