import { useToast } from "@/components/ui/use-toast";
import { LikeInfo, PostsPage } from "@/types/Post";
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deletePost,
  
} from "./action";
import axios from "axios";

export function useDeletePostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return deletePost(id);
    },
    onSuccess: async (data) => {
      //data is the response from the server (deletePost action)
      const deletedPostId = data.postDeletedId;

      await queryClient.cancelQueries({
        queryKey: ["post-feed"],
      });

      queryClient.setQueryData<InfiniteData<PostsPage, string | null>>(
        ["post-feed"],
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((post) => post.id !== deletedPostId),
            })),
          };
        }
      );

      toast({
        description: "Post eliminado exitosamente",
        title: "Post eliminado",
        variant: "default",
      });
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

  const { mutate,isPending } = useMutation({
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
