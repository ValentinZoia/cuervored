import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PostData } from "@/types/Post";
import React, { Suspense, useEffect, useRef, useState } from "react";
import LikeButton from "../LikeButton";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import InputComment from "./InputComment";
import Image from "next/image";
import Commentslist from "./Commentslist";
import UserHeaderPost from "../UserHeaderPost";
import SkeletonComment from "./SkeletonComment";
import { HandlerErrorBoundary } from "../PostsErrorBoundary";

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

  const [currentSrc, setCurrentSrc] = useState(imageUrl);
  const [hasError, setHasError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleCommentButtonClick = () => {
    inputRef.current?.focus(); // Hacer focus al input
  };

  useEffect(() => {
    setCurrentSrc(imageUrl);
    setHasError(false);
  }, [post, imageUrl]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="hidden">Comments</DialogTitle>
      <DialogContent
        aria-describedby={undefined}
        className="bg-black text-primary p-0 overflow-hidden  md:w-[calc(100vw-8rem)] md:max-w-[1920px] md:mx-auto sm:border-none"
      >
        <div className="flex flex-col min-h-[80vh] h-auto  sm:flex-row ">
          {imageUrl && (
            <div className="relative w-full hidden md:block md:w-1/2 lg:w-7/12 h-full sm:h-full md:h-full lg:h-full">
              <Image
                unoptimized={true}
                priority={true}
                onError={() => {
                  if (!hasError) {
                    setCurrentSrc("/imageDontLoaded.webp"); // Cambia a imagen de respaldo en caso de error
                    setHasError(true);
                  }
                }}
                src={currentSrc}
                alt="Imagen de la publicación"
                 layout="fill"
                objectFit="contain"
                className="bg-card sm:bg-transparent"
              />
            </div>
          )}

          <div
            className={`bg-card px-4 py-2 flex flex-col  w-full justify-between ${
              imageUrl ? "w-full md:w-1/2 lg:w-5/12" : "md:w-full"
            } h-full    my-auto`}
          >
            {/* Header */}
            <div className="border-b  w-[calc(100%-50px)] flex flex-col justify-start pb-2">
              <UserHeaderPost
                avatarUrl={avatar}
                username={username}
                timeAgo={timeAgo}
              />
              <div className="max-h-40 overflow-y-auto">
                <p className="text-sm  whitespace-pre-line break-words text-primary">
                  {content}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="px-0 sm:px-4 overflow-y-auto h-full flex-1">
              <HandlerErrorBoundary>
                <Suspense fallback={<SkeletonComment />}>
                  <Commentslist post={post} />
                </Suspense>
              </HandlerErrorBoundary>
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
                  aria-label="Comentar"
                  variant="ghost"
                  size="sm"
                  onClick={handleCommentButtonClick}
                  className="className='flex items-center justify-center gap-2 hover:fill-blueSanlorenzo hover:text-blueSanlorenzo dark:hover:text-[#a2b6f8] hover:bg-[#00336634]"
                >
                  <MessageCircle className="size-4 md:size-5 text-primary " />
                  <span className="hidden sm:inline">Comentar</span>
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
