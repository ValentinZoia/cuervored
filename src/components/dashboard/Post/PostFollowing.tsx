"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle,  Loader } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import SkeletonPost from "./SkeletonPost";
import { PostData as PostType } from "@/types/Post";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import { Post } from "./Post";
import { getPostsFollowing } from "@/data/posts";

export default function PostFollowing() {
 


  // Configuración de `useInfiniteQuery`
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed","following"], //<-- La key de la información
    queryFn: ({
      pageParam,
    }: {
      pageParam?: string | number | null | undefined;
    }) => getPostsFollowing({ pageParam }), //<-- Cómo traer la información
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined, // Define el siguiente parámetro de paginación
    staleTime: Infinity, //<-- Cuanto tiempo mostrara la info desde cache sin hacer un refetch en segundo plano
    
    

  });

  

const posts = data?.pages.flatMap((page) => page.posts) || [];


  if (isLoading) {
    return <SkeletonPost />;
  }

  if (error ) {
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

 if(status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center mt-4">No hay publicaciones para mostrar todavia.</p>
    )

  }
    
    return (
      <InfiniteScrollContainer
        className="relative z-10 space-y-6"
        onBottomReached={() => hasNextPage && !isLoading && fetchNextPage()}
      >
        {posts.map((post: PostType) => <Post key={post.id} post={post} />)
        }
        {isFetchingNextPage && <Loader className="mx-auto animate-spin" />}
      </InfiniteScrollContainer>
    );
  

  
}
