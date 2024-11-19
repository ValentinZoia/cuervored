import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Divide, Loader } from "lucide-react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import SkeletonPost from "./SkeletonPost";
import { PostsPage, PostData as PostType } from "@/types/Post";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import { Post } from "./Post";
import { getPosts } from "@/data/posts";
import { useEffect } from "react";
export default function PostList() {
  const session = useSession();


  // Configuración de `useInfiniteQuery`
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"], //<-- La key de la información
    queryFn: ({
      pageParam,
    }: {
      pageParam?: string | number | null | undefined;
    }) => getPosts({ pageParam }), //<-- Cómo traer la información
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined, // Define el siguiente parámetro de paginación
    staleTime: Infinity, //<-- Cuanto tiempo mostrara la info desde cache sin hacer un refetch en segundo plano
    
    

  });

  



  if (!session.data) {
    return <SkeletonPost />;
  }

  if (isLoading) {
    return <SkeletonPost />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "Unexpected error"}
        </AlertDescription>
      </Alert>
    );
  }

  if (data && session.data ) {
    
    return (
      <InfiniteScrollContainer
        className="relative z-10 space-y-6"
        onBottomReached={() => hasNextPage && !isLoading && fetchNextPage()}
      >
        {data.pages.flatMap((page) =>
          page.posts.map((post: PostType) => <Post key={post.id} post={post} />)
        )}
        {isFetchingNextPage && <Loader className="mx-auto animate-spin" />}
      </InfiniteScrollContainer>
    );
  }
}
