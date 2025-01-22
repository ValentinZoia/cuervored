"use client"
import dynamic from 'next/dynamic';
import { Suspense, memo } from 'react';
import { PostData as PostType } from "@/types/Post";
import { getPostsForYou } from "@/data/posts";
import SkeletonPost from "./SkeletonPost";
import { useInfinitePosts } from '@/hooks/useInfinitePosts';
import { ErrorAlert } from '../ErrorAlert';
import { EmptyState } from '../EmptyState';
import { LoadMoreSpinner } from '../LoadMoreSpinner';

// Dynamic imports para componentes pesados
const Post = dynamic(() => import("./Post").then(mod => mod.Post), {
  ssr: false,
  
},);


const InfiniteScrollContainer = dynamic(() => import("../InfiniteScrollContainer"),{ssr:false});


// Componentes memoizados para mejor rendimiento
const MemoizedPost = memo(({ post }: { post: PostType }) => (
  <Post post={post} />
));
MemoizedPost.displayName = 'MemoizedPost';


export default function PostForYou() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfinitePosts({
    queryKey: "for-you",
    fetchFn: getPostsForYou
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isLoading) {
    return <SkeletonPost />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return <EmptyState text='No hay publicaciones para mostrar todavia.'/>;
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