"use server"//nunca olvidar de colocar "use server", sino no funciona
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/types/Post";
import { revalidatePath } from "next/cache";

export async function submitPost(textareaValue: string | null, imageUrl: string | null) {
  try {
    
    

    //check if the user is logged in
    const session = await auth();
    const user = session?.user;

    //verify user
    if (!session || !user?.id) {
      throw new Error("Unauthorized");
    }

    if ((!textareaValue && !imageUrl) || textareaValue === "" || imageUrl === "") {
      throw new Error("Both fields dont be empty");
    }

     
    //create the post
    const post = await prisma.post.create({
      data: {
        content: textareaValue,
        userId: user.id,
        image: imageUrl,
      },
      include: getPostDataInclude(user.id)
    });

    

    //if exists a problem with the post, throw an error
    if (!post) {
      throw new Error("Post not created");
    }

    if(post.userId !== session.user.id) throw new Error("Unauthorized");

    revalidatePath("/dashboard");
    //return a success message
    return {
      ok: true,
      SuccessMessage: "Post created successfully",
      error: null,
    };
  } catch (error: any) {
    return {
      ok: false,
      SuccessMessage: null,
      error: error.message,
    };
  }
}
