"use server"; //nunca olvidar de colocar "use server", sino no funciona

import { auth } from "@/auth";
import prisma from "@/lib/prisma";


export async function deletePost(id: string) {
  try {

    //Verificar que el usuario este logeado
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    //buscar post a eliminar con el id
    const post = await prisma.post.findUnique({
      where: { id },
    });

    //si no hay post, arrojar error
    if (!post) throw new Error("Post not found");

    //si el id del usuario que hizo el post no coincide con el id del usuario logeado, arrojar error
    if (post.userId !== session.user.id) throw new Error("Unauthorized");

    //borrar post
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




