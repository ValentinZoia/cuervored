import prisma from "@/lib/prisma";
import { getUserDataSelect, SearchPage, UserData } from "@/types/Post";
import { User } from "@prisma/client";
import axios from "axios";
import { notFound } from "next/navigation";


export const getUserById = async (id:string):Promise<User | null> =>{
    try {
        const user = await prisma.user.findUnique({
            where: {id}
        })

        return user
    } catch (error) {
        return null
    }
}

export const getUserByEmail = async (email:string):Promise<User | null> =>{
    try {
        const user = await prisma.user.findUnique({
            where: {email}
        })

        return user
    } catch (error) {
        return null
    }
}

export const getUserByUsername = async (username:string, loggedInUserId:string):Promise<UserData>=>{
    
        if(!username || !loggedInUserId){
            throw new Error("Invalid parameters");
        }

        const user = await prisma.user.findFirst({
            where: {
              name: {
                equals: username,
                mode: "insensitive",
              },
            },
            select: getUserDataSelect(loggedInUserId),
          });
        
          if (!user) {
            notFound();
          }
        
          return user ;
    
}

export const getAllUsersByUsername =  async ({
    pageParam = null,
    username = null,
  }: {
    pageParam?: string | number | null | undefined;
    username?: string | null | undefined;
  }) => {
    try {
        
        const response = await axios.get<SearchPage>(
          `/api/search/${username}${pageParam ? `?cursor=${pageParam}` : ""}`
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



