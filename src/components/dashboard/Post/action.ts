"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { LikeInfo } from "@/types/Post";
import axios from "axios";

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

export async function getLikePost(postId: string) {
  try {
   const response= await axios.get<LikeInfo>(`/api/posts/${postId}/likes`);
  return response.data
    


  } catch (error: any) {

    if (axios.isAxiosError(error)) {
      // Si el error es de Axios, revisa si hay una respuesta del servidor
      if (error.response) {
        console.error("Backend error:", error.response.data);
        // Retorna un mensaje específico dependiendo del status o el mensaje en data
        const message = error.response.data?.error || "Unexpected server error";
        throw new Error(message);
      } else if (error.request) {
        // Error en la solicitud pero no hubo respuesta
        console.error("No response received from server");
        throw new Error(
          "No response received from server. Please check your connection."
        );
      } else {
        // Error al configurar la solicitud
        console.error("Request setup error:", error.message);
        throw new Error("Error in request setup: " + error.message);
      }



    } else {

      // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
      console.error("General error:", error);
      throw new Error(
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  }
}



export async function deleteLikePost(postId: string) {
  try {
   const response= await axios.delete<LikeInfo>(`/api/posts/${postId}/likes`);
  return response
    


  } catch (error: any) {

    if (axios.isAxiosError(error)) {
      // Si el error es de Axios, revisa si hay una respuesta del servidor
      if (error.response) {
        console.error("Backend error:", error.response.data);
        // Retorna un mensaje específico dependiendo del status o el mensaje en data
        const message = error.response.data?.error || "Unexpected server error";
        throw new Error(message);
      } else if (error.request) {
        // Error en la solicitud pero no hubo respuesta
        console.error("No response received from server");
        throw new Error(
          "No response received from server. Please check your connection."
        );
      } else {
        // Error al configurar la solicitud
        console.error("Request setup error:", error.message);
        throw new Error("Error in request setup: " + error.message);
      }



    } else {

      // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
      console.error("General error:", error);
      throw new Error(
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  }
}



export async function postLikePost(postId: string) {
  try {

    
    if(!postId){
      throw new Error("postId is neccesary")
    }

   const response = await axios.post<LikeInfo>(`/api/posts/${postId}/likes`);
    return response
    


  } catch (error: any) {

    if (axios.isAxiosError(error)) {
      // Si el error es de Axios, revisa si hay una respuesta del servidor
      if (error.response) {
        console.error("Backend error:", error.response.data);
        // Retorna un mensaje específico dependiendo del status o el mensaje en data
        const message = error.response.data?.error || "Unexpected server error";
        throw new Error(message);
      } else if (error.request) {
        // Error en la solicitud pero no hubo respuesta
        console.error("No response received from server");
        throw new Error(
          "No response received from server. Please check your connection."
        );
      } else {
        // Error al configurar la solicitud
        console.error("Request setup error:", error.message);
        throw new Error("Error in request setup: " + error.message);
      }



    } else {

      // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
      console.error("General error:", error);
      throw new Error(
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  }
}





export async function commentPost(id: string, comment: string) {}
