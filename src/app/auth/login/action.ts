"use server"; //nunca olvidar de colocar "use server", sino no funciona

import { LogInFormSchema, FormState } from "@/lib/zodSchema";
import { ERRORS, signIn } from "@/auth";

import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function login(
    prevState: FormState,
    formData: FormData,
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
                message: null,
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const { email, password } = validatedFields.data;

        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT[0].path,
        });

        return { message: "Usuario creado exitosamente", errors: null };
    } catch (error) {
        if (isRedirectError(error)) throw error;

        if (error instanceof AuthError) {
            // All authentication errors show the same message to prevent user enumeration
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: null,
                        errors: {
                            general: [
                                "Email ya en uso con diferente proveedor (google o github)!",
                            ],
                        },
                    };
                case "CallbackRouteError":
                    console.log(
                        "-------------LEE CON ATENCION------------",
                        "------CAUSA-----------",
                        error.cause?.err?.message,
                        "---------NOMBRE-----------",
                        error.name,
                        "----------MENSAJE----------",
                        error.message,
                        "------------STACK---------------",
                        error.stack,
                        "-------------TIPO-----------------",
                        error.type,
                    );
                    switch (error.cause?.err?.message) {
                        case ERRORS.CredentialError:
                            return {
                                message: null,
                                errors: {
                                    general: ["Credenciales Incorrectas"],
                                },
                            };
                        default: {
                            return {
                                message: null,
                                errors: {
                                    general: [
                                        "Ocurrió un error inesperado. Por favor, intentá de nuevo más tarde.",
                                    ],
                                },
                            };
                        }
                    }

                default:
                    return {
                        message: null,
                        errors: {
                            general: [
                                "Ocurrió un error inesperado. Por favor, intentá de nuevo más tarde.",
                            ],
                        },
                    };
            }
        }

        // For unexpected errors, show generic message and re-throw
        return {
            message: null,
            errors: {
                general: [
                    "Ocurrió un error inesperado. Por favor, intentá de nuevo más tarde.",
                ],
            },
        };
    }
}
