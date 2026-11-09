import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";

type Props = {
    params: Promise<{ slug: string }>;
};

export default function PostPage({ params }: Props) {
    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <Suspense
                fallback={
                    <p className="text-gray-500">Loading post...</p>
                }
            >
                {params.then(({ slug }) => (
                    <PostContent slug={slug} />
                ))}
            </Suspense>
        </main>
    );
}

async function PostContent({ slug }: { slug: string }) {
    const post = await prisma.post.findUnique({
        where: {
            slug,
        },
    });

    if (!post) {
        notFound();
    }

    return (
        <>
            <h1 className="text-3xl font-semibold">
                {post.title}
            </h1>

            <p>{post.content}</p>
        </>
    );
}