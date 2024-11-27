"use client"
import { Button } from "@/components/ui/button";
import { FollowerInfo } from "@/types/Post";
import React from "react";
import { useFollowerUserMutation } from "./mutation";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const { data, mutate } = useFollowerUserMutation({ userId, initialState });

  return (
    <Button variant="default" className="text-sm" onClick={() => mutate()}>
      {data.isFollowedByUser ? "Siguiendo" : "Seguir"}
    </Button>
  );
}
