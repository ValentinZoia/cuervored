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
  getLikePost,
  deleteLikePost,
  postLikePost,
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
        queryKey: ["posts"],
      });

      queryClient.setQueryData<InfiniteData<PostsPage, string | null>>(
        ["posts"],
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
        description: "Post deleted successfully",
        title: "Post deleted",
        variant: "default",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        description: "Something went wrong. Please try again.",
        title: "Post deletion failed",
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

  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get<LikeInfo>(`/api/posts/${postId}/likes`);
      return response.data;
    },
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
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
        description: "Something went wrong. Please try again.",
        title: "Post liked failed",
        variant: "destructive",
      });
    },
    
  });

  return {
    data,
    mutate,
  };
}
