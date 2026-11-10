import { cacheLife, cacheTag } from "next/cache";
export const getPosts=async ()=>{
    "use cache"
    cacheLife("days")
    cacheTag("posts")
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response.json() ;
}