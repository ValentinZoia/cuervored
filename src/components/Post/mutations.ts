import { useToast } from "@/components/ui/use-toast";
import { LikeInfo, PostsPage } from "@/types/Post";
import {
  InfiniteData,
  QueryFilters,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost } from "./action";
import axios from "axios";

export function useDeletePostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return deletePost(id);
    },
    onSuccess: async (data) => {
      if (data.ok) {
        const queryFilter = {
          queryKey: ["post-feed"],
          predicate(query) {
            return query.queryKey.includes("for-you");
          },
        } satisfies QueryFilters;

        await queryClient.cancelQueries(queryFilter);

        queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
          queryFilter,
          (oldData) => {
            if (!oldData) return;

            const firstPage = oldData.pages[0];
            if (firstPage) {
              return {
                ...oldData,
                pages: [
                  {
                    ...firstPage,
                    posts: firstPage.posts.filter(
                      (post) => post.id !== data.postDeletedId
                    ),
                  },
                  ...oldData.pages.slice(1),
                ],
              };
            }
            return oldData;
          }
        );
        queryClient.invalidateQueries({
          queryKey: queryFilter.queryKey,
          predicate(query) {
            return queryFilter.predicate(query) && !query.state.data;
          },
        });

        toast({
          description: "Post eliminado exitosamente",
          title: "Post eliminado",
          variant: "default",
        });
      }
    },
    onError: (error) => {
      console.error(error);
      toast({
        description: "Algo salio mal. Por favor intenta de nuevo.",
        title: "Post eliminado fallido",
        variant: "destructive",
      });
    },
  });

  return mutation;
}

interface UseLikePostMutationProps {
  postId: string;
  initialState: LikeInfo;
}

export function useLikePostMutation({
  postId,
  initialState,
}: UseLikePostMutationProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["like-info", postId];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get<LikeInfo>(`/api/posts/${postId}/likes`);
      return response.data;
    },
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      data.isLikedByUser
        ? await axios.delete<LikeInfo>(`/api/posts/${postId}/likes`)
        : await axios.post<LikeInfo>(`/api/posts/${postId}/likes`),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousState = queryClient.getQueryData<LikeInfo>(queryKey);

      queryClient.setQueryData<LikeInfo>(queryKey, () => ({
        likes:
          (previousState?.likes || 0) +
          (previousState?.isLikedByUser
            ? previousState.likes == 0
              ? 0
              : -1
            : 1),
        isLikedByUser: !previousState?.isLikedByUser,
      }));

      return { previousState };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        description: "Algo salio mal, Por favor, intentalo de nuevo.",
        title: "Post liked fallido",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    isPending,
    mutate,
  };
}
