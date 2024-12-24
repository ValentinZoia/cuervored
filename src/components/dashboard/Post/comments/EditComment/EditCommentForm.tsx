import { Button } from "@/components/ui/button";
import { CaslaButton } from "@/components/ui/CaslaButton";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createCommentSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateCommentMutation } from "./mutation";

interface EditCommentFormProps {
  commentId: string;
  commentContent: string;
  onClose: (isOpen: boolean) => void;
}

type CommentFormValues = z.infer<typeof createCommentSchema>;

export default function EditCommentForm({
  commentId,
  commentContent,
  onClose,
}: EditCommentFormProps) {
  const mutation = useUpdateCommentMutation();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: commentContent,
    },
  });

  const handleSubmit = async (FormData: CommentFormValues) => {
    //verificar que existan cambios

    if (FormData.content === commentContent) {
      toast({
        variant: "default",
        description: "No se han realizado cambios",
        title: "Actualización de comentario fallida",
      });
      return;
    }

    mutation.mutate(
      {
        content: FormData,
        commentId: commentId,
      },
      {
        onSuccess: () => {
          onClose(false);
        },
      }
    );
  };

   // Observar el valor del input
  const content = form.watch("content");
  

  // Deshabilitar el botón si:
  // - El contenido está vacío
  // - No hubo cambios en el contenido
  // - La mutación está en progreso o el formulario está enviando
  const disabled =
    mutation.isPending ||
    form.formState.isSubmitting ||
    content === commentContent ||
    !content;

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Escribe Algo..." {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 w-full flex gap-2 justify-end">
          <Button
            type="button"
            variant={"outline"}
            size={"sm"}
            onClick={() => onClose(false)}
          >
            Cancelar
          </Button>
          <CaslaButton type="submit" variant="blueToRed" size={"sm"} disabled={disabled}>
          {mutation.isPending ? "Guardando..." : "Guardar Cambios"}
          </CaslaButton>
        </div>
      </form>
    </Form>
  );
}
