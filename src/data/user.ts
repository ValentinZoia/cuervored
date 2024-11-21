import prisma from "@/lib/prisma";
import { getUserDataSelect, UserData } from "@/types/Post";
import { User } from "@prisma/client";


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
            throw new Error("User not found");
          }
        
          return user ;
    
}