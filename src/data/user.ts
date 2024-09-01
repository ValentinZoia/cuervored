import prisma from "@/lib/prisma";
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