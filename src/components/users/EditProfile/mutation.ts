"use client"
import { useToast } from "@/components/ui/use-toast";
import { PostsPage } from "@/types/Post";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { updateUserProfile } from "../actions";
import { z } from "zod";
import { EditProfileUserSchema } from "@/lib/zodSchema";

export function useUpdateProfileMutation() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname()
  const queryClient = useQueryClient();

  type ProfileFormValues = z.infer<typeof EditProfileUserSchema>;

  const mutation = useMutation({
    mutationFn: async ({
      values,
      imageUrl,
      image_100
    }: {
      values: ProfileFormValues;
      imageUrl: string | null;
      image_100: string | null
    }) => {
      return updateUserProfile(values, imageUrl, image_100);
    },
    onSuccess: async (data) => {

      // Recuperamos la respuesta de la API
      const { ok, updatedUser, message, error } = data;
      

      if (!ok) {
        toast({
          variant: "destructive",
          description: error || "Error al actualizar el perfil, por favor intenta de nuevo.",
        });
        return;
      }

      // Actualizamos los datos de los posts en el cache de React Query
      const queryFilter = {
        queryKey: ["post-feed"],
        predicate(query) {
          return (
            query.queryKey.includes("for-you") ||
            (query.queryKey.includes("user-posts"))
          );
        },
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return undefined;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.map((post) => {
                if (post.user.id === updatedUser?.id) {
                  return {
                    ...post,
                    user: {
                      ...updatedUser,
                      image: updatedUser.image,
                    },
                  };
                }
                return post;
              }),
            })),
          };
        }
      );

      // Refrescamos la página en la que estamos actualmente
      
      router.push(pathname)
      router.refresh()

      // Mostramos una notificación de éxito
      toast({
        title: "Perfil actualizado",
        description: message || "Perfil actualizado exitosamente.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Error al actualizar el perfil, porfavor intentalo de nuevo." + error.message as string,
      });
    },
  });

  return mutation;
}
