"use server";

import { SignUpFormSchema, FormState } from "@/lib/zodSchema";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  try {
     // 1. Validate form fields
  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  //if any form fields are invalid, return error
  if (!validatedFields.success) {
    return {
      message: "",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  //Verify if the user already exists
  const userFound = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userFound) {
    return {
      message: "",
      errors: {
        general: ["An user with that email already exists"],
      },
    };
  }

  // 2. Create user
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: email,
      email,
      password: hashedPassword,

    },
  });

  
  

  return {
    message: "User created successfully",
    errors: undefined,
  };
  } catch (error) {
    return{
      message: "",
      errors: {
        general: [error as string || "An error occurred while creating the user"],
      },
    }
  }

 
}
