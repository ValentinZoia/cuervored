import { CommentsPage, PostData } from "@/types/Post";
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { deleteComment, submitComment } from "./actions";

export function useSubmitCommentMutation(postId: string) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  

  const mutation = useMutation({
    mutationFn: async ({ post, comment }: { post: PostData; comment: string })=> submitComment({post, comment}),
    onSuccess: async (data) => {
      //recuperamos la respuesta de la api
      const { newComment, message, ok, error } = data;
       

      

        const queryKey: QueryKey = ["comments", postId];

        await queryClient.cancelQueries({ queryKey });

        // Actualiza los datos en el caché local de React Query.
        queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
          queryKey,
          (oldData) => {
            if (!oldData) return undefined; // Si no hay datos previos, no hace nada.

            const firstPage = oldData.pages[0]; // Obtiene la primera página de comentarios.

            if (firstPage) {
              return {
                pageParams: oldData.pageParams, // Mantiene los parámetros de paginación actuales.
                pages: [
                  {
                    ...firstPage, // Copia los datos de la primera página.
                    comments: [
                      ...firstPage.comments, // Mantiene los comentarios existentes.
                      newComment as (typeof firstPage.comments)[number], // Agrega el nuevo comentario.
                    ],
                  },
                  ...oldData.pages.slice(1), // Mantiene el resto de las páginas intactas.
                ],
              };
            }

            return oldData; // Si no hay una primera página, retorna los datos actuales.
          }
        );

         // Incrementa el contador global
      queryClient.setQueryData<number>(["commentCount", postId], (oldCount) => (oldCount || 0) + 1);


        // Fuerza una actualización para consultas sin datos, asegurando que se sincronicen.
        queryClient.invalidateQueries({
          queryKey,
          predicate(query) {
            return !query.state.data; // Solo actualiza si la consulta no tiene datos.
          },
        });

       

        //Toast success
        toast({
          description: message,
          title: "Comment created successfully",
          variant: "success",
        });
      
    },
    onError(error: Error) {
      toast({
        variant: "destructive",
        title: "Comment created failed",
        description:
          error.message || "Failed to delete comment. Please try again.",
      });
    },
  });

  return mutation;
}

export function useDeleteCommentMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id }: { id:string })=> deleteComment(id),
    onSuccess: async (data) => {
      //recuperamos la respuesta de la api
      const { deletedComment, ok, message } = data;

      const queryKey: QueryKey = ["comments", deletedComment?.postId];

      // Cancela las consultas relacionadas con el comentario eliminado.
      await queryClient.cancelQueries({ queryKey });

      // Actualiza el caché eliminando el comentario del estado local.
      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return; // Si no hay datos previos, no hace nada.

          return {
            pageParams: oldData.pageParams, // Mantiene los parámetros de paginación.
            pages: oldData.pages.map((page) => ({
              previousCursor: page.previousCursor, // Mantiene el cursor de la página.
              comments: page.comments.filter(
                (c) => c.id !== deletedComment?.id
              ), // Filtra el comentario eliminado.
            })),
          };
        }
      );

       // Decrementa el contador global
       queryClient.setQueryData<number>(["commentCount", deletedComment?.postId], (oldCount) =>
        oldCount ? oldCount - 1 : 0
      );

      //Toast success
      toast({
        description: message,
        title: "Comment deleted successfully",
        variant: "default",
      });
    },
    onError(error: Error) {
      toast({
        variant: "destructive",
        title: "Comment deleted failed",
        description:
          error.message || "Failed to delete comment. Please try again.",
      });
    },
  });

  return mutation;
}
