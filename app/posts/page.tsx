import Link from "next/link";
// import { prisma } from "../lib/prisma";
export const instant=false
export default async function PostPage(){
    
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json() ;
    //const posts=await prisma.post.findMany();

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
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}