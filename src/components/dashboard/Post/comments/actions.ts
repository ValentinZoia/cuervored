import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createCommentSchema } from "@/lib/zodSchema";
import { getCommentDataInclude, PostData } from "@/types/Post";

export async function submitComment({post, comment}:{post:PostData, comment:string}){
    try {
         //Check if the user is authenticated
         const session = await auth();
         if (!session) {
             throw new Error("Unauthorized: Authentication required");
         };

         const validatedFields = createCommentSchema.safeParse({
            content: comment,
          });
      
          //if any form fields are invalid, return error
          if (!validatedFields.success) {
           throw new Error("Comment field must not be empty.");
          }
      
          const { content } = validatedFields.data;


          //create the comment
          const newComment = await prisma.comment.create({
            data: {
              content,
              postId: post.id,
              userId: session.user.id,
            },
            include: getCommentDataInclude(session.user.id)
          });
      
          return {newComment, ok:true, error: null, message: "Comment created successfully"};



    } catch (error:any) {
        return{
            ok: false,
            error: error.message
        }
    }
}

export async function deleteComment(id:string){
    try {
        //Check if the user is authenticated
        const session = await auth();
        if (!session) {
            throw new Error("Unauthorized: Authentication required");
        };


        const comment = await prisma.comment.findUnique({
            where:{id}
          });
      
          if (!comment) {
            throw new Error("Comment not found");
          }
      
          if (comment.userId !== session.user.id) {
            throw new Error("Unauthorized");
          }
      
          const commentDeleted = await prisma.comment.delete({
            where: { id },
          });
      
          
      
          return {commentDeleted, ok:true, error: null, message: "Comment deleted successfully"}

    } catch (error:any) {
        return{
            ok: false,
            error: error.message
        }
    }
}