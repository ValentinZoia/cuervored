import { Prisma } from "@prisma/client";




  export function getUserDataSelect(loggedInUserId: string) {
    return{
      id:true,
      name: true,
      fullName: true,
      bio: true,
      image:true,
      image_100:true,
      createdAt: true,
      followers:{
        
        select:{
          followerId:true,
          
        },
      },
      following: {
        select: {
          followingId: true,
        },
      },
      _count: {
        select: {
          post: true,
          followers: true,
          following:true,

          
        },
      },
      matchesAttendance:{
        select:{
          matchId:true
        }
      },

      
      
    } satisfies Prisma.UserSelect;
  }

  export type UserData = Prisma.UserGetPayload<{
    select: ReturnType<typeof getUserDataSelect>;
  }>;


  export interface UserPage {
    users: UserData[];
    nextCursor: string | null;
  }

  