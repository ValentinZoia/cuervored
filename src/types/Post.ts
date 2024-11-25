// src/types/Post.ts

import { Prisma } from "@prisma/client";




  export function getUserDataSelect(loggedInUserId: string) {
    return{
      id:true,
      name: true,
      fullName: true,
      bio: true,
      image:true,
      createdAt: true,
      _count: {
        select: {
          post: true,
          
        },
      },
    } satisfies Prisma.UserSelect;
  }

  export type UserData = Prisma.UserGetPayload<{
    select: ReturnType<typeof getUserDataSelect>;
  }>;

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

  export interface LikeInfo {
    likes:number;
    isLikedByUser: boolean;
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