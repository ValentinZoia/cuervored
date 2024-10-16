"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";


export async function submitPost(textareaValue: string, file: File | null) {
    const session = await auth();
    const user = session?.user;
    if (!session || !user?.id) {
        // return {
        //   ok: false,
        //   message: "",
        //   error: "Unauthorized",
        // }
        throw new Error("Unauthorized");
      }

      const {content} = createPostSchema.parse({
        content: textareaValue});

    await prisma.post.create({
        data: {
            content,
            userId: user.id,
            image: null,
        },
            
    });

    revalidatePath("/dashboard")

}