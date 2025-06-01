// src/types/Post.ts

import { Prisma } from "@prisma/client";
import { getUserDataSelect, UserData } from "./User";




  

  export function getPostDataInclude(loggedInUserId: string) {
    return {
      user: {
        select: getUserDataSelect(loggedInUserId),
      },
      likes: {
        select: {
          userId: true,
          user: true,
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    } satisfies Prisma.PostInclude;
  }
  
  export type PostData = Prisma.PostGetPayload<{
    include: ReturnType<typeof getPostDataInclude>;
  }>;



  export interface PostsPage {
    posts: PostData[];
    nextCursor: string | null;
  }

  

  export function getCommentDataInclude(loggedInUserId: string) {
    return {
      user: {
        select: getUserDataSelect(loggedInUserId),
      },
    } satisfies Prisma.CommentInclude;
  }
  
  export type CommentData = Prisma.CommentGetPayload<{
    include: ReturnType<typeof getCommentDataInclude>;
  }>;
  
  export interface CommentsPage {
    comments: CommentData[];
    previousCursor: string | null;
  }
  



  export function getLikeDataInclude(loggedInUserId: string) {
    return {
      user: {
        select: getUserDataSelect(loggedInUserId),
      },
    } satisfies Prisma.LikeInclude;
  }
  
  export type LikeData = Prisma.LikeGetPayload<{
    include: ReturnType<typeof getLikeDataInclude>;
  }>;





  export interface LikeInfo {
    likes:number;
    isLikedByUser: boolean;
  }

  
  export enum PostFeedType {
    POST_FEED="post-feed",
    FOR_YOU = 'for-you',
    FOLLOWING = 'following'
  }

  export enum QueryKeys {
    USER_POSTS = 'user-posts',
    LIKE_INFO = "like-info",
    COMMENTS = 'comments',
    COMMENT_COUNT = "commentCount"
    
  }

  export interface FetchPostsParams {
  pageParam?: string | number | null;
  userId?: string;
  queryKey?: string; // Añadido para casos donde se necesite
}

export type FetchPostsFunction = (
  params: FetchPostsParams
) => Promise<PostsPage>;