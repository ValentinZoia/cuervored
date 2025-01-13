"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

import PreviewImageToPost from "./PreviewImageToPost";
import { useNewPost } from "@/hooks/useNewPost";
import SkeletonNewPost from "./SkeletonNewPost";
import UserAvatar from "../Post/UserAvatar";
import { CaslaButton } from "@/components/ui/CaslaButton";
import { DefaultSession, Session } from "next-auth";
import ButtonAddPhoto from "./ButtonAddPhoto";

interface NewPostProps {
  session:Session | DefaultSession | null
}

export default function NewPost({session}:NewPostProps) {
  const user = session?.user;
  

  const{
    handleTextareaChange,
    handleRemovePreview,
    handleUploadPhotoButtonClick,
    handleFileChange,
    handleSubmit,
    mutation,
    textareaValue,
    previewUrl,
    fileInputRef,
    textareaRef,
    
  } = useNewPost({initialPreviewUrl: null, initialTextareaValue: null});

  if(!user) {
    return <SkeletonNewPost />
  }
  

  

  return (
    
    <Card className="max-w-[680px] mb-6 bg-card">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Link href={`/dashboard/users/${user.name}`} aria-label="Ver perfil">
           <UserAvatar username={user.name as string} avatarUrl={user.image as string} />
          </Link>
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              className="bg-background"
              placeholder="¿Qué estás pensando sobre el club?"
              onChange={handleTextareaChange}
              aria-label="Escribe tu post"
            />
            <div className="w-fit">
              {previewUrl && (
                <PreviewImageToPost
                  previewUrlSrc={previewUrl}
                  handleRemovePreview={handleRemovePreview}
                />
              )}
            </div>

            <div className="mt-2 flex justify-between items-center">
              <ButtonAddPhoto handleFileChange={handleFileChange} fileInputRef={fileInputRef} handleUploadPhotoButtonClick={handleUploadPhotoButtonClick} />
              <CaslaButton
                aria-label="Publicar"
                variant="blueToRed"
                className="relative z-10"
                size="sm"
                onClick={handleSubmit}
                disabled={(!textareaValue && !previewUrl) || mutation.isPending}
              >
                {mutation.isPending ? "Publicando..." : "Publicar"}
              </CaslaButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    
  );
}
