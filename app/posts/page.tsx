// import { cookies } from "next/headers";
import RecentlyViewedPosts from "@/components/recently-viewed-posts";

import Link from "next/link";
import { Suspense } from "react";
// import { getPosts } from "../lib/utils";
import { prisma } from "../lib/prisma";
import { createPost } from "@/actions/actions";
import UpvoteBtn from "@/components/upvote-btn";
//export const instant=false


export default async function PostsPage(){
    
   // const posts=await getPosts()
    const posts=await prisma.post.findMany();

    

    // const posts = await getPosts()
    // console.log(posts)
    return(
        <div className="space-y-8">
            <section className="space-y-4">
                <h1 className="text-center text-4xl font-semibold
                text-zinc-950 sm:text-5xl">
                    Posts
                </h1>
                <ul className="space-y-3">
                    {posts.slice(0,5).map((post:{
                        id:string;
                        title:string;
                        content:string;
                        votes:number|null;
                    })=>(
                        <li key={post.id}>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center
                            sm:justify-between">
                                <Link 
                                    href={`/posts/${post.id}`}
                                    className="text-lg font-semibold text-zinc-950 hover:text-2xl"
                                >
                                    {post.title.charAt(0).toUpperCase()+post.title.slice(1)}
                                </Link>
                                <UpvoteBtn postId={post.id} votes={post.votes}/>
                            </div>
                        </li>
                    ))}
                </ul>

                <Suspense fallback={<p>Loading recently viewed posts...</p>}>
                    <RecentlyViewedPosts />
                </Suspense>
                
            </section>
            <section className="space-y-4 border-t border-zinc-200 pt-6">
                    <h2 className="text-xl font-semibold text-zinc-950">New Post</h2>
                    <form action={createPost} className="space-y-4">
                        <label className="block space-y-2">
                            <span className="text-sm font-medium text-zinc-700">Title</span>
                            <input
                                name="title"
                                type="text"
                                required
                                className="h-10 w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 text-zinc-950
                                transition-colors focus:border-zinc-500"
                            />
                        </label>
                        <label className="block space-y-2">
                            <span className="text-sm font-medium text-zinc-700">Content</span>
                            <textarea
                                name="content"
                                required
                                className="h-10 w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 text-zinc-950
                                transition-colors focus:border-zinc-500"
                            />
                        </label>
                        <button>Create</button>
                    </form>
            </section>
        </div>
    );
}