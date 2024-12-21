"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude, getUserDataSelect } from "@/types/Post";

export async function updatePost(
  content: string | null,
  imageUrl: string | null,
  postId: string
) {
  try {
    //check if the user is logged in
    const session = await auth();
    const user = session?.user;
    console.log(content, imageUrl, postId)

    //verify user
    if (!session || !user?.id) {
      throw new Error("Unauthorized");
    }

    if(!postId){
        throw new Error("Post not found");
    }

    //verify if the fields are empty
    if ((!content && !imageUrl) || (content === "" && imageUrl === "")) {
      throw new Error("Both fields dont be empty");
    }

    
    //update the post
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content: content,
        image: imageUrl,
      },
      include: getPostDataInclude(user.id), // Include the user data always
    });

    //if exists a problem with the post, throw an error
    if (!updatedPost) {
      throw new Error("Post not updated");
    }
    //return a success message
    return {
      updatedPost,
      ok: true,
      SuccessMessage: "Post updated successfully",
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
