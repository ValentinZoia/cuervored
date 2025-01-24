import React from "react";
import UserAvatar from "../Post/UserAvatar";
import {  UserData } from "@/types/User";
import {FollowerInfo} from "@/types/Follower"
import EditProfileButton from "./EditProfile/EditProfileButton";
import FollowButton from "./FollowButton";
import FollowerCount from "./FollowerCount";

interface UserHeaderProps {
  user: UserData; //usuario al cual corresponde el perfil que se esta viendo, NO EL LOGEADO
  loggedInUserId: string;
}
export default function UserHeader({ user, loggedInUserId }: UserHeaderProps) {
  const followerInfo: FollowerInfo = {
    followers: user.followers.length,
    isFollowedByUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId
    ),
  };
  

  return (
    <div className="w-full bg-card border-x-[1px]  h-auto flex flex-col items-stretch">
      <div className="w-full h-1/2 bg-slate-700"></div>

      <div className="h-1/2 mb-4 pt-3 px-4 flex flex-col items-stretch ">
        <div className="flex flex-row flex-wrap justify-between items-start w-full">
          <div className="min-w-12 -mt-1 w-1/4 mb-3 h-auto overflow-visible">
            <div className="">
              <UserAvatar
                avatarUrl={user?.image_100}
                username={user?.name}
                imageType="profileLarge"
              />
            </div>
          </div>
          <div className="">
            {user.id === loggedInUserId ? (
              <EditProfileButton user={user} />
            ) : (
              <FollowButton userId={user.id} initialState={followerInfo} />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start mb-4">
          <h1 className="text-2xl font-bold">
            {user?.fullName
              ? user?.fullName
              : user?.name
              ? user?.name
              : "Unknown"}
          </h1>
          <span className="text-muted-foreground">@{user?.name}</span>
          <div className="w-full mt-4 ">
            <p className="text-sm whitespace-pre-line break-words">
              {user?.bio}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <p className="text-sm">
            <FollowerCount userId={user.id} initialState={followerInfo} />
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground ">
              {" "}
              {user.following.length} Siguiendo
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
