import { useToast } from "@/components/ui/use-toast";
import { PostsPage } from "@/types/Post";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "../actions";
import { z } from "zod";
import { EditProfileUserSchema } from "@/lib/zodSchema";

export function useUpdateProfileMutation() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  type ProfileFormValues = z.infer<typeof EditProfileUserSchema>;

  const mutation = useMutation({
    mutationFn: async ({
      values,
      imageUrl,
    }: {
      values: ProfileFormValues;
      imageUrl: string | null;
    }) => {
      return updateUserProfile(values, imageUrl);
    },
    onSuccess: async (data) => {

      // Recuperamos la respuesta de la API
      const { ok, updatedUser, message, error } = data;
      

      if (!ok) {
        toast({
          variant: "destructive",
          description: error || "Failed to update profile. Please try again.",
        });
        return;
      }

      // Actualizamos los datos en el cache de React Query
      const queryFilter: QueryFilters = {
        queryKey: ["posts"],
      };

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

      // Refrescamos la página para mostrar los datos actualizados
      router.push(`${updatedUser?.name}`);

      // Mostramos una notificación de éxito
      toast({
        title: "Profile updated",
        description: message || "Profile updated successfully.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to update profile. Please try again.",
      });
    },
  });

  return mutation;
}
