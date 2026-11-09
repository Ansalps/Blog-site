import Link from "next/link";
import { prisma } from "../lib/prisma";
import { createPost } from "../actions/actions";

export default async function PostList() {
    const user = await prisma.user.findUnique({
        where: {
            email: "john@example.com",
        },
        include: {
            posts: true,
        },
    });

    return (
        <>
            <ul className="border-t border-b border-black/10 py-5 leading-8">
                {user?.posts.map((post) => (
                    <li
                        key={post.id}
                        className="flex items-center justify-between px-5"
                    >
                        <Link
                            href={`/postes/${post.slug}`}
                            className="text-blue-600"
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>

            <form
                action={createPost}
                className="flex flex-col gap-y-2 w-[300px]"
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="px-2 py-1 rounded-sm bg-amber-200"
                />

                <textarea
                    name="content"
                    rows={5}
                    placeholder="Content"
                    className="px-2 py-1 rounded-sm bg-amber-200"
                />

                <button
                    type="submit"
                    className="bg-blue-500 py-2 text-white rounded-sm"
                >
                    Create Post
                </button>
            </form>
        </>
    );
}