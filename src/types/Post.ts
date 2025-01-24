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

  