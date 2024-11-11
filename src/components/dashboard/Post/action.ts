"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function deletePost(id: string) {
  try {
    const session = await auth();

    if (!session) throw new Error("Unauthorized");

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) throw new Error("Post not found");

    if (post.userId !== session.user.id) throw new Error("Unauthorized");

    const postDeleted = await prisma.post.delete({
      where: { id },
    });

    const postDeletedId = postDeleted.id;

    //return a success message
    return {
        ok: true,
        SuccessMessage: "Post deleted successfully",
        error: null,
        postDeletedId,
      };


  } catch (error:any) {
    return {
        ok: false,
        SuccessMessage: null,
        error: error.message,
      };
  }
}

export async function likePost(id: string) {}

export async function unlikePost(id: string) {}

export async function commentPost(id: string, comment: string) {}
