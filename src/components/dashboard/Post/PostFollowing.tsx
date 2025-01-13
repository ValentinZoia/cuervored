"use client"
import dynamic from 'next/dynamic';
import { Suspense, memo } from 'react';
import { Loader } from "lucide-react";
import { PostData as PostType } from "@/types/Post";
import {  getPostsFollowing } from "@/data/posts";
import SkeletonPost from "./SkeletonPost";
import { useInfinitePosts } from '@/hooks/useInfinitePosts';

// Dynamic imports para componentes pesados
const Alert = dynamic(() => import("@/components/ui/alert").then(mod => mod.Alert));
const AlertTitle = dynamic(() => import("@/components/ui/alert").then(mod => mod.AlertTitle));
const AlertDescription = dynamic(() => import("@/components/ui/alert").then(mod => mod.AlertDescription));
const AlertCircle = dynamic(() => import("lucide-react").then(mod => mod.AlertCircle));
const Post = dynamic(() => import("./Post").then(mod => mod.Post), {
  loading: () => <SkeletonPost />
});
const InfiniteScrollContainer = dynamic(() => import("../InfiniteScrollContainer"));

// Componentes memoizados para mejor rendimiento
const ErrorAlert = memo(({ error }: { error: Error | unknown }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      {error instanceof Error ? error.message : "Unexpected error"}
    </AlertDescription>
  </Alert>
));
ErrorAlert.displayName = 'ErrorAlert';



const EmptyState = memo(() => (
  <p className="text-center mt-4">No hay publicaciones para mostrar todavia.</p>
));
EmptyState.displayName = 'EmptyState';



const LoadMoreSpinner = memo(() => (
  <div className="flex justify-center py-4">
    <Loader className="animate-spin" />
  </div>
));
LoadMoreSpinner.displayName = 'LoadMoreSpinner';



const MemoizedPost = memo(({ post }: { post: PostType }) => (
  <Post post={post} />
));
MemoizedPost.displayName = 'MemoizedPost';



export default function PostFollowing() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfinitePosts({
    queryKey: "following",
    fetchFn: getPostsFollowing
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isLoading) {
    return <SkeletonPost />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return <EmptyState />;
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