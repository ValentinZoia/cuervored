"use server";

import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function updateProfile(formData: {
  name: string;
  imageSrc: string;
}) {
  const session = await auth();

  // If the user is not logged in, throw an error
  if (!session || !session?.user?.id) {
    
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/user/${session.user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    // If the response is not ok, throw an error
    if (!response.ok) {
      const errorData = await response.json();
      
      throw new Error(errorData.error);
    }

    // If the response is ok, return the success message
    const SuccessData = await response.json();
    revalidatePath("/dashboard/profile");
    return {
      ok: true,
      message: SuccessData.message,
      error: "",
    };
  } catch (error : any) {
    return {
      ok: false,
      message: "",
      error: error.message,
    };
  }
}

export async function deleteImage({ id: id }: { id: string | undefined }) {
  const session = await auth();

  // If the user is not logged in, throw an error
  if (!session || !session?.user?.id) {
    

    throw new Error("Unauthorized");
  }

  try {
    if (!id) {
      

       throw new Error("User ID is undefined");
    }

    const updateUser = await prisma.user.update({
      where: { id: id },
      data: { image: null },
    });
    revalidatePath("/dashboard/profile");
    return {
      ok: true,
      message: "Image deleted successfully",
      error: "",
    };
  } catch (error: any) {
    return {
      ok: false,
      message: "",
      error: error.message,
    };
  }
}

export async function deleteAccount({ id: id }: { id: string | undefined }) {
  const session = await auth();

  // If the user is not logged in, throw an error
  if (!session || !session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    if (!id) {   
    

      throw new Error("User ID is undefined");
    }

    await prisma.user.delete({
      where: { id: id },
    });

    revalidatePath("/dashboard/profile");

    await signOut({ redirect: false });

    return {
      ok: true,
      message: "Account deleted successfully",
      error: "",
    };
  } catch (error: any) {
    return {
      ok: false,
      message: "",
      error: error.message || "An error occurred while deleting the account",
    };
  }
}
