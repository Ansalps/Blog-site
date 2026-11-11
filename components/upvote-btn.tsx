"use client"
import { upvotePost } from "@/actions/actions"
import Icon from "./icon";
// import { useState } from "react"

type UpvoteBtnProps={
    postId:string;
    votes:number|null;
}
export default function UpvoteBtn({postId,votes}:UpvoteBtnProps){
    // const [votes,setVotes]=useState(0)
    return (
        <button
            type="button"
            onClick={()=>{
                upvotePost(postId);
            }}
            className="h-9 shrink-0 rounded-md border-zinc-300
            text-sm font-semibold text-zinc-800 transition-colors"
        >
            Upvote {votes}

            <Icon />
        </button>
    )
}