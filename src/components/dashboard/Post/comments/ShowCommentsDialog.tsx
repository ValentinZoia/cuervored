import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostData } from "@/types/Post";
import React, { useRef } from "react";
import LikeButton from "../LikeButton";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import InputComment from "./InputComment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { compareDate } from "@/utils/compareDate";
import Image from "next/image";
import Commentslist from "./Commentslist";
import UserHeaderPost from "../UserHeaderPost";

interface ShowCommentsProps {
  post: PostData;
  open: boolean;
  setOpen: (state: boolean) => void;
}

export default function ShowCommentsDialog({
  post,
  open,
  setOpen,
}: ShowCommentsProps) {
  const session = useSession();
  const username = post.user.name ?? "Unknown";
  const avatar = post.user.image ?? "";
  const timeAgo = new Date(post.createdAt);
  const imageUrl = post.image ?? "";
  const likes = post.likes;
  const content = post.content;

  
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCommentButtonClick = () => {
    inputRef.current?.focus(); // Hacer focus al input
  };
  

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTitle className="hidden">Comments</DialogTitle>
  <DialogContent
    aria-describedby={undefined}
    className="bg-black p-0 overflow-hidden w-[calc(100vw-8rem)] max-w-[1920px] mx-auto border-none"
  >
    <div className="flex flex-col h-auto sm:flex-row max-h-[calc(100%-0rem)] sm:h-auto sm:max-h-[calc(100%-0rem)] md:h-auto md:max-h-[calc(100%-0rem)] lg:h-auto lg:max-h-[calc(100%-0rem)]">
      {imageUrl && (
        <div className="relative w-full sm:w-1/2 md:w-1/2 lg:w-7/12 h-full sm:h-full md:h-full lg:h-full">
          <Image
            src={imageUrl}
            alt="Imagen de la publicación"
            layout="fill"
            objectFit="contain"
            className="bg-card sm:bg-transparent"
          />
        </div>
      )}

      <div
        className={`bg-card px-4 py-2 flex flex-col w-full justify-between ${
          imageUrl ? "sm:w-1/2 md:w-1/2 lg:w-5/12" : "md:w-full"
        } h-full sm:max-h-[calc(100vh-4rem)]`}
      >
        {/* Header */}
        <div className="border-b  w-[calc(100%-30px)] flex flex-col justify-start pb-2" >
          <UserHeaderPost avatarUrl={avatar} username={username} timeAgo={timeAgo} />
          <div className="max-h-40 overflow-y-auto">
            <p className="text-sm  whitespace-pre-line break-words">{content}</p>
          </div>
          
        </div>

        {/* Comments Section */}
        <div className="px-4 overflow-y-auto h-full max-h-[300px] md:h-[400px] md:max-h-[400px] lg:h-[700px] lg:max-h-[700px]">
          <Commentslist post={post} />
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-1 mb-4">
            <LikeButton
              postId={post.id}
              initialState={{
                likes: likes.length,
                isLikedByUser: post.likes.some(
                  (like) => like.userId === session.data?.user.id
                ),
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCommentButtonClick}
            >
              <MessageCircle className="size-4 md:size-5 mr-1" />
            </Button>
            
          </div>
          <InputComment post={post} ref={inputRef} />
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>
  );
}
