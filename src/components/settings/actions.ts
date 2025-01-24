"use server";
import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { clear } from "console";
import { redirect } from "next/navigation";

export async function deleteAccount(id:string):Promise<{ok:boolean, error:any | null, message:string | null}> {
    try {
        // 1. Check if the user is authenticated
            const session = await auth();
            if (!session) {
              throw new Error("Unauthorized");
            }

            //2. Check if the id exists
            if(!id){
                throw new Error("Id not found");
            }

            //3. Verify if the id is the same as the id of the user logged in
            if (id !== session.user.id) {
              throw new Error("Unauthorized");
            }

            //4. Delete the user
             await prisma.user.delete({
                where:{id}
            });
            
            
            
            return {ok:true, error: null, message: "Cuenta eliminada con exito"}
    } catch (error: any) {
        console.error(error, error.message);
        return {
          ok: false,
          message: null,
          error: error.message,
        };
      }
}