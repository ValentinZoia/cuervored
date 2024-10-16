"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";



export async function submitPost(textareaValue: string, file: File | null) {
  try {
    const session = await auth();
    const user = session?.user;

    //verify user
    if (!session || !user?.id) {
      throw new Error("Unauthorized");
    }

    //parse the data
    const { content } = createPostSchema.parse({
      content: textareaValue,
    });

    //create the post
    const post = await prisma.post.create({
      data: {
        content,
        userId: user.id,
        image: null,
      },
    });

    //if exists a problem with the post, throw an error
    if (!post) {
      throw new Error("Post not created");
    }

    revalidatePath("/dashboard");
    //return a success message
    return {
      ok: true,
      SuccessMessage: "Post created successfully",
      error: "",
    };

    
  } catch (error) {
    return {
      ok: false,
      SuccessMessage: "",
      error: "Something went wrong",
    };
  }
}
