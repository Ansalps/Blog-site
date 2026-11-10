import { cookies } from "next/headers";

export default async function RecentlyViewedPosts() {
    const cookiesStore = await cookies();
    const recentlyViewedPosts=cookiesStore.get("recentlyViewedPosts")

    //await new Promise((resolve)=>setTimeout(resolve,5000))

    return (
        <div>
            <h2>Recently Viewed Posts</h2>
            <ul>
                {recentlyViewedPosts? (
                    JSON.parse(recentlyViewedPosts.value).map(
                        (post:{id:number;title:string})=>(
                            <li key={post.id}>{post.title}</li>
                        ),
                    )
                ) : (
                    <p>No recently viewed posts.</p>
                )
            }
            </ul>
        </div>
    )
}