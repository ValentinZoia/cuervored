'use server'

import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { error } from "console"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: { name: string, image: string }) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error('You must be logged in to update your profile')
  }

  console.log(formData)
  try {
    const response = await fetch(`http://localhost:3000/api/user/${session.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
  
    if (!response.ok) {
      const errorData = await response.json();
      return{

        message: "",
        error:  errorData.error
      }
    } 
  
    
    const SuccessData = await response.json()

    console.log(SuccessData.message)
  
    revalidatePath('/profile')
    return {
      message: SuccessData.message,
      error: "",
    }
  } catch (error) {
    return{
      message: "",
      error: error,
    }
  }
  
}

export async function deleteImage({id: id}: {id: string | undefined}) {
  try {
    const updateUser = await prisma.user.update({
      where:{ id: id},
      data: {image: null}
    });
    revalidatePath('/profile')
    return{
      message: "Image deleted successfully",
      error: "",
    }
  } catch (error: any) {
    return{
      message: "",
      error: error,
    }
  }
}