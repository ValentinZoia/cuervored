"use server"//nunca olvidar de colocar "use server", sino no funciona

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { EditProfileUserSchema } from "@/lib/zodSchema";
import { getUserDataSelect } from "@/types/Post";

import { z } from "zod";

type ProfileFormValues = z.infer<typeof EditProfileUserSchema>;

export async function updateUserProfile(
  values: ProfileFormValues,
  imageUrl: string | null
) {
  try {
    
    // 1. Validate form fields
    const validatedFields = EditProfileUserSchema.safeParse({
      username: values.username,
      full_name: values.full_name,
      bio: values.bio,
    });

    //if any form fields are invalid, return error
    if (!validatedFields.success) {
      throw new Error(validatedFields.error.message);
    }

    // 2. Check if the user is authenticated
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    
    // Check if the username is already taken
    const existingUser = await prisma.user.findFirst({
      where: {
        name: {
          equals: values.username,
          mode: "insensitive",
        },
      },
    });

    if (existingUser && existingUser.id !== session.user.id) {
      throw new Error("Username already taken");
    }

    // Prepare data for the update
    const updateData: Record<string, any> = {
        name: values.username,
        fullName: values.full_name,
        bio: values.bio,
      };
  
      // Include image only if imageUrl is provided
      if (imageUrl) {
        updateData.image = imageUrl;
      }
  
      // Update the user in the database
      const updatedUser = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: updateData,
        select: getUserDataSelect(session.user.id), // Include the user data always
      });
  
      return {
        updatedUser,
        ok: true,
        message: "Profile updated successfully",
        error: null,
      };
  } catch (error: any) {
    return {
      ok: false,
      message: null,
      error: error.message,
    };
  }
}
