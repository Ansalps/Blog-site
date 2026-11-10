"use server"

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(formData:FormData) {

    const title=String(formData.get("title")??"").trim();
    const content=String(formData.get("content")??"").trim();

    await prisma.post.create({
        data:{
            title,
            content
        }
    })
    revalidatePath("/posts")
}

export async function upvotePost(id:string) {
    // if (!Number.isInteger(id)){
    //     throw new Error("Invalid post id");
    // }

    await prisma.post.update({
        where:{
            id,
        },
        data:{
            votes:{
                increment:1,
            },
        },
    });
    revalidatePath("/posts")
    revalidatePath(`/posts/${id}`)
}
