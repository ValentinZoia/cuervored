"use client"
import { useInfiniteQuery, } from "@tanstack/react-query";
import SkeletonPost from "../Post/SkeletonPost";
import {PostData as PostType } from "@/types/Post";
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import { Post } from "../Post/Post";
import { getUserPosts } from "@/data/posts";
import { LoadMoreSpinner } from "../LoadMoreSpinner";
import { ErrorAlert } from "../ErrorAlert";



interface UserPostsProps {
  userId: string
}

export default function UserPosts({userId}:UserPostsProps) {
  


  // Configuración de `useInfiniteQuery`
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["post-feed","user-posts", userId], //<-- La key de la información
    queryFn: ({
      pageParam,
    }: {
      pageParam?: string | number | null | undefined;
    }) => getUserPosts({ pageParam, userId }), //<-- Cómo traer la información
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined, // Define el siguiente parámetro de paginación
    staleTime: Infinity, //<-- Cuanto tiempo mostrara la info desde cache sin hacer un refetch en segundo plano
    
    

  });

  



  

  if (isLoading) {
    return <SkeletonPost />;
  }

  if (error) {
    return (
     <ErrorAlert error={error} />
    );
  }

  if (data && data.pages.length > 0) {
    
    return (
      <InfiniteScrollContainer
        className="relative z-10 bg-card"
        onBottomReached={() => hasNextPage && !isLoading && fetchNextPage()}
      >
        {data.pages.flatMap((page) =>
          page.posts.map((post: PostType) => <Post key={post.id} post={post} />)
        )}
        {isFetchingNextPage && <LoadMoreSpinner />}
      </InfiniteScrollContainer>
    );
  }

  if(data && data.pages.length === 0) {
    return (
      <p>No hay publicaciones</p>
    )
  }
}
