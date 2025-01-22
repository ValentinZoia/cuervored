import { Prisma } from "@prisma/client";
import { getUserDataSelect } from "./User";

  export function getFollowerDataInclude(loggedInUserId: string) {
    return {
      follower: {
        select: getUserDataSelect(loggedInUserId),
      },
    } satisfies Prisma.FollowInclude;
  }
  
  export type FollowData = Prisma.FollowGetPayload<{
    include: ReturnType<typeof getFollowerDataInclude>;
  }>;


  export interface FollowerInfo {
    followers: number;
    isFollowedByUser: boolean;
  }
