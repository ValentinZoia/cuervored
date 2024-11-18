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
      <DialogContent aria-describedby="modal-content" className="p-0 overflow-hidden w-[calc(100vw-8rem)] max-w-[1920px] mx-auto border-none">
        <div className="flex flex-col md:flex-row h-[calc(100%-0rem)] md:h-auto md:max-h-[calc(100%-1rem)] lg:max-h-[calc(100%-1rem)] ">
          {imageUrl && (
            <div className="relative w-full md:w-1/2 lg:w-7/12 h-[300px] md:h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-4rem)]">
              <Image
                src={imageUrl}
                alt="Imagen de la publicación"
                layout="fill"
                objectFit="contain"
                className="bg-card md:bg-black"
              />
            </div>
          )}

          

          <div className={`flex flex-col w-full ${imageUrl ? "md:w-1/2 lg:w-5/12" : "md:w-1/1 lg:w-12/12"} h-full md:max-h-[calc(100vh-2rem)] overflow-hidden`}>
            <div className="flex items-center space-x-4 p-4 border-b">
              <Avatar>
                <AvatarImage src={avatar} alt={username} />
                <AvatarFallback>{username[0] ?? "Unknown"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{username}</p>
                <p className="text-xs text-muted-foreground">
                  {compareDate(timeAgo)}
                </p>
              </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto">
              <Commentslist post={post} />
            </div>

            <div className="border-t p-4">
              <div className="flex items-center space-x-1  mb-4">
                <LikeButton
                  postId={post.id}
                  initialState={{
                    likes: likes.length,
                    isLikedByUser: post.likes.some(
                      (like) => like.userId === session.data?.user.id
                    ),
                  }}
                />
                <Button variant="ghost" size="sm" onClick={handleCommentButtonClick} >
                  <MessageCircle className="size-4 md:size-5 mr-1" />
                  
                </Button>
                <Button variant="ghost" size="sm">
                  <Send className=" size-4 md:size-5 mr-1" />
                  
                </Button>
              </div>
              <InputComment post={post} ref={inputRef}  />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
