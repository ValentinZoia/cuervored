import { compareDate } from "@/utils/compareDate";
import React from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

interface UserPostProps {
  avatarUrl: string | null;
  username: string | null;
  linkTo?: string;
  timeAgo?: Date;
}

export default function UserHeaderPost({
  avatarUrl,
  username,
  linkTo,
  timeAgo,
}: UserPostProps) {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  return (
    <div className="relative z-10 flex items-center space-x-4 pb-2">
      <Link href={linkTo ? linkTo : `${baseUrl}/dashboard/users/${username}`}>
        <UserAvatar avatarUrl={avatarUrl} username={username} size="size-10"  />
      </Link>

      <div className="relative z-10">
        <Link href={linkTo ? linkTo : `${baseUrl}/dashboard/users/${username}`}>
          <p className="text-sm font-medium relative z-0">{username}</p>
        </Link>

        {timeAgo && (
          <p className="text-xs text-muted-foreground relative z-10">
            {compareDate(timeAgo)}
          </p>
        )}
      </div>
    </div>
  );
}
