import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    email: z
    .string()
    .min(1, { message: "Este campo no puede estar vacío." })
    .email({ message: "Por favor, escriba un correo electrónico válido." })
    .trim(),
  username: z
    .string()
    .min(1, { message: "Este campo no puede estar vacío." })
    .max(30, { message: "El username debe tener como máximo 30 caracteres." })
    .trim()
    .refine((val) => val === val.toLowerCase(), {
      message: "El username debe estar en minúsculas.",
    })
    .refine((val) => !/\s/.test(val), {
      message: "El username no debe contener espacios.",
    }),
    
  full_name: z
    .string()
    .min(1, { message: "El campo del Nombre Completo no puede estar vacío." })
    .trim(),
  password: z
    .string()
    .min(1, { message: "El campo de la contraseña no puede estar vacío." })
    .min(8, { message: "Debe tener al menos 8 caracteres." })
    .regex(/[a-zA-Z]/, { message: "Debe contener al menos una letra." })
    .regex(/[0-9]/, { message: "Debe contener al menos un número." })
    .trim(),

    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

  export const LogInFormSchema = z.object({
    email: z.string().email({ message: "Por favor, ingrese un correo electrónico válido." }).trim(),
    password: z
      .string()
      .min(1, { message: "El campo de la contraseña no puede estar vacío." })
      .trim(),
  });
  
  export type FormState =
    | {
        errors?:
          | {
              general?: string[] | undefined | null;
              email?: string[] | undefined | null;
              username?: string[] | undefined | null;
              full_name?: string[] | undefined | null;
              password?: string[] | undefined | null;
              confirmPassword?: string[] | undefined | null;
            }
          | undefined
          | null;
        message?: string | undefined | null;
      }
    | undefined
    | null;
  
  export const createCommentSchema = z.object({
    content: z
      .string()
      .min(1, { message: "El campo del comentario no puede estar vacío." })
      .trim(),
  });
  
  export const EditProfileUserSchema = z.object({
    username: z
      .string()
      .min(1, { message: "El campo del nombre de usuario no puede estar vacío." })
      .max(30, { message: "Debe tener como máximo 30 caracteres." })
      .trim(),
  
    full_name: z
      .string()
      .min(1, { message: "El campo del nombre completo no puede estar vacío." })
      .min(2, { message: "El nombre completo debe tener al menos 2 caracteres." })
      .max(50, { message: "Debe tener como máximo 50 caracteres." })
      .trim(),
    bio: z
      .string()
      .max(160, { message: "Debe tener como máximo 160 caracteres." })
      .trim(),
  });
