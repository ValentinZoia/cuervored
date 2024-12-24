import { useToast } from "@/components/ui/use-toast";
import { CommentsPage } from "@/types/Post";
import {
  useQueryClient,
  useMutation,
  QueryFilters,
  InfiniteData,
  QueryKey,
} from "@tanstack/react-query";
import { updateComment } from "./action";
import { createCommentSchema } from "@/lib/zodSchema";
import { z } from "zod";

export function useUpdateCommentMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  type CommentFormValues = z.infer<typeof createCommentSchema>;

  const mutation = useMutation({
    mutationFn: async ({
      content,
      commentId,
    }: {
      content: CommentFormValues;
      commentId: string;
    }) => {
      return updateComment(content, commentId);
    },
    onSuccess: async (data) => {
      // Recuperamos la respuesta de la API
      const { ok, updatedComment, SuccessMessage, error } = data;

      if (!ok) {
        toast({
          variant: "destructive",
          description: error || "Failed to update profile. Please try again.",
        });
        return;
      }

      // Actualizamos los datos de los posts en el cache de React Query
      const queryKey: QueryKey = ["comments", updatedComment?.postId];

      await queryClient.cancelQueries({ queryKey });

      // Actualiza los datos en el caché local de React Query.
      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return undefined; // Si no hay datos previos, no hace nada.

          return {
            pageParams: oldData.pageParams, // Mantiene los parámetros de paginación.
            pages: oldData.pages.map((page) => ({
              ...page, // Mantiene otros datos de la página.
              comments: page.comments.map(
                (comment) =>
                  comment.id === updatedComment?.id
                    ? { ...comment, ...updatedComment } // Actualiza el comentario si coincide el ID.
                    : comment // Mantiene el resto de los comentarios sin cambios.
              ),
            })),
          };
        }
      );

      // Mostramos una notificación de éxito
      toast({
        title: "Comment updated",
        description: SuccessMessage || "Comment updated successfully.",
        variant: "success",
      });
    },
    onError: async (error) => {
      toast({
        variant: "destructive",
        description: ("Failed to update comment. Please try again." +
          error.message) as string,
      });
    },
  });
  return mutation;
}
