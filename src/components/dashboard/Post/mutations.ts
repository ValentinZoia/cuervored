import { useToast } from "@/components/ui/use-toast";
import { Post, PostsPage } from "@/types/Post";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "./action";


export function useDeletePostMutation() {
    const {toast} = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({id}:{id:string}) => {
            return deletePost(id);
        },
        onSuccess: async (data) => {
            //data is the response from the server (deletePost action)
            const deletedPostId = data.postDeletedId;

            await queryClient.cancelQueries({
                queryKey: ["posts"]});


            queryClient.setQueryData<InfiniteData<PostsPage, string | null>>(
                ["posts"],
                (oldData) =>{
                  if(!oldData) return;  

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
            })
        },
        onError: (error) => {
            console.error(error);
            toast({
                description: "Failed to delete post",
                title: "Post deletion failed",
                variant: "destructive",
            })
        }
    }); 

    return mutation;
}