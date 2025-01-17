import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/types/Post";
import UserHeaderPost from "../Post/UserHeaderPost";
import { getUserByUsername } from "@/data/user";
import FollowButton from "../users/FollowButton";


export async function RecommendedUsers() {
  // const session = await auth();
  // if (!session || !session.user || session.user.id === "") return null;

  // //devuelve info del usuario logeado, nos sirve sus followings.
  // const loggedInUser = await getUserByUsername(
  //   session.user.name as string,
  //   session.user.id
  // );

  // // devuelve 3 o menos usuarios que no sigue el usuario logeado
  // const usersToFollow = await prisma.user.findMany({
  //   where: {
  //     AND: [
  //       {
  //         NOT: {
  //           id: session.user.id,
  //         },
  //       },
  //       {
  //         NOT: {
  //           id: {
  //             in: loggedInUser?.following.map((follow) => follow.followingId),
  //           },
  //         },
  //       },
  //     ],
  //   },
  //   select: getUserDataSelect(session.user.id),
  //   take: 3,
  // });

  

  // const baseUrl = process.env.NEXT_PUBLIC_URL;

  return (
    <Card className=" lg:col-span-1 lg:h-fit ">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Usuarios Recomendados</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          hola
          {/* {usersToFollow.length > 0 ? (usersToFollow.map((user, index) => (
            //todas las referencias a user en este scope son el usuario el cual  sale en recomendados, no el loggeado
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center space-x-2">
                <UserHeaderPost
                  username={user.name}
                  avatarUrl={user.image}
                  linkTo={`${baseUrl}/${user.name}`}
                />
              </div>
              <FollowButton
                size={"sm"}
                userId={user.id}
                initialState={{
                  followers: user.followers.length,
                  isFollowedByUser: user.followers.some(
                    ({ followerId }) => followerId === session.user.id
                  ),
                }}
              />
            </div>
          ))):(<><p>No hay usuarios para mostrar</p></>)} */}
        </div>
      </CardContent>
    </Card>
  );
}
