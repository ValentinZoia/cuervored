"use client"
import { PostsPage, PostData } from "@/types/Post";
import { EmptyState } from "../EmptyState";
import { useInfinitePosts, UseInfinitePostsProps } from "@/hooks/useInfinitePosts";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import { LoadMoreSpinner } from "../LoadMoreSpinner";
import { Post } from "./Post";

interface PostListProps extends UseInfinitePostsProps {}



const PostList = ({queryKey, fetchFn, isUserPagePosts = false}:PostListProps) => {
  const {
      data,
      isLoading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      
    } = useInfinitePosts({
      queryKey,
      fetchFn,
      isUserPagePosts,

    });
  
    const posts = data.pages.flatMap((page) => page.posts) || [];
  
   
    const handleLoadMore = () => {
      if (hasNextPage && !isLoading) {
        fetchNextPage();
      }
    };
  
    if (!posts.length && !hasNextPage) {
      return <EmptyState text='No hay publicaciones para mostrar todavia.'/>;
    }
  
    
  
    return (
      <InfiniteScrollContainer
        className="relative z-0 space-y-6"
        onBottomReached={handleLoadMore}
      >
        
          {posts.map((post: PostData) => (
            <Post key={post.id} post={post} />
          ))}
        
        
        {isFetchingNextPage && <LoadMoreSpinner />}
      </InfiniteScrollContainer>
    );
}
export default PostList