"use client"
import { useInfiniteQuery, } from "@tanstack/react-query";
import SkeletonPost from "../Post/SkeletonPost";
import {PostData as PostType } from "@/types/Post";
// import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
// import { Post } from "../Post/Post";
import { getUserPosts } from "@/data/posts";
import { LoadMoreSpinner } from "../LoadMoreSpinner";
import { ErrorAlert } from "../ErrorAlert";
import { EmptyState } from "../EmptyState";
import { memo, Suspense } from "react";
import dynamic from "next/dynamic";


// Dynamic imports para componentes pesados
const Post = dynamic(() => import("../Post/Post").then(mod => mod.Post), {
  ssr: false,
  
},);


const InfiniteScrollContainer = dynamic(() => import("../InfiniteScrollContainer"),{ssr:false});


// Componentes memoizados para mejor rendimiento
const MemoizedPost = memo(({ post }: { post: PostType }) => (
  <Post post={post} />
));
MemoizedPost.displayName = 'MemoizedPost';


interface UserPostsProps {
  userId: string
}

export default function UserPosts({userId}:UserPostsProps) {
  


  // Configuración de `useInfiniteQuery`
  const {
    status,
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

  
  const posts = data?.pages.flatMap((page) => page.posts) || [];
  
    if (isLoading) {
      return <SkeletonPost />;
    }
  
    if (error) {
      return <ErrorAlert error={error} />;
    }
  
    if (status === "success" && !posts.length && !hasNextPage) {
      return <EmptyState text='No hay publicaciones para mostrar todavia.' />;
    }
  
    const handleLoadMore = () => {
      if (hasNextPage && !isLoading) {
        fetchNextPage();
      }
    };
  
    return (
      <InfiniteScrollContainer
        className="relative z-0 space-y-6"
        onBottomReached={handleLoadMore}
      >
        <Suspense fallback={<SkeletonPost />}>
          {posts.map((post: PostType) => (
            <MemoizedPost key={post.id} post={post} />
          ))}
        </Suspense>
        
        {isFetchingNextPage && <LoadMoreSpinner />}
      </InfiniteScrollContainer>
    );
  
}
