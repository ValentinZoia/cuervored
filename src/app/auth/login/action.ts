"use server";

import { LogInFormSchema, FormState } from "@/lib/zodSchema";
import { signIn } from "@/auth";
import type { SignInResponse } from "next-auth/react";
import { AuthError } from "next-auth";

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {

    // 1. Validate form fields
    const validatedFields = LogInFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    //if any form fields are invalid, return error
    if (!validatedFields.success) {
      return {
        message: "",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { email, password } = validatedFields.data;

    const res = (await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })) as SignInResponse;
    

    if (res?.error) {
      return { message: "", errors: { general: [res.error] } };
    } else {
      return { message: "User created successfully", errors: undefined };
    }
    

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "", errors: { general: ["Invalid credentials"] } };
        default:
          return { message: "", errors: { general: [`${error.cause?.err?.message}`] } };
      }
    }
    throw error;
  }
}
