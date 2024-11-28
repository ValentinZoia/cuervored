import { CommentsPage, PostsPage } from "@/types/Post";
import axios from "axios";

export const getPosts = async ({
  pageParam = null,
}: {
  pageParam?: string | number | null | undefined;
}) => {
  try {
   

    const response = await axios.get<PostsPage>(
      `/api/posts${pageParam ? `?cursor=${pageParam}` : ""}`
    );

    if (!response || !response.data) throw new Error("Error fetching posts");

    return response.data;
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
};

export const getComments = async ({
  pageParam = null,
  postId = null,
}: {
  pageParam?: string | number | null | undefined;
  postId?: string | null | undefined;
}) => {
  try {
    const response = await axios.get<CommentsPage>(
      `/api/posts/${postId}/comments${pageParam ? `?cursor=${pageParam}` : ""}`
    );

    if (!response || !response.data) throw new Error("Error fetching comments");
    
    return response.data;
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
};

export const getUserPosts = async ({
  pageParam = null,
  userId
}: {
  pageParam?: string | number | null | undefined;
  userId: string
}) => {
  try {
    if(!userId ){
      throw new Error("Missing userId ");
    }


    const response = await axios.get<PostsPage>(
      `/api/user/${userId}/posts${pageParam ? `?cursor=${pageParam}` : ""}`
    );

    if (!response || !response.data) throw new Error("Error fetching posts");

    return response.data;
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
};
