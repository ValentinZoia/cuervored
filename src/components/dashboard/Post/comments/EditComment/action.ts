"use server";//nunca olvidar de colocar "use server", sino no funciona
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createCommentSchema } from "@/lib/zodSchema";
import { z } from "zod";

type CommentFormValues = z.infer<typeof createCommentSchema>
 

export async function updateComment(content: CommentFormValues, commentId: string) {
  try {

    //Validate form fields
    const validatedFields = createCommentSchema.safeParse({
      content: content.content,
    });

    //if any form fields are invalid, return error
    if (!validatedFields.success) {
      throw new Error(validatedFields.error.message);
    }

    //check if the user is logged in
    const session = await auth();
    const user = session?.user;
    
    //verify user
    if (!session || !user?.id) {
      throw new Error("Unauthorized");
    }

    if(!commentId){
        throw new Error("Comment not found");
    }

    //verify if the fields are empty
    if (!content.content || content.content === "") {
      throw new Error("The content field dont be empty");
    }

    
    //update the comment
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content.content,
      },
    });

    //if exists a problem with the comment, throw an error
    if (!updatedComment) {
      throw new Error("Comment not updated");
    }
    //return a success message
    return {
      updatedComment,
      ok: true,
      SuccessMessage: "Comment updated successfully",
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