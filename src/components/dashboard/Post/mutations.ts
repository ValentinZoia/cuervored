import { useToast } from "@/components/ui/use-toast";
import { Post } from "@/types/Post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "./action";

export function useDeletePOstMutation(post:Post) {
    const {toast} = useToast();

    const queryClient = useQueryClient();

    const router = useRouter();

    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: async ({id}:{id:string}) => {
            return deletePost(id);
        },
        onSuccess: () => {},
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