"use client";
import { Textarea } from "@/components/ui/textarea";
import { useNewPost } from "@/hooks/useNewPost";
import { PostData } from "@/types/Post";
import React, { useRef, useState } from "react";
import PreviewImageToPost from "../../NewPost/PreviewImageToPost";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CaslaButton } from "@/components/ui/CaslaButton";
import { ImageUpload } from "../../users/EditProfile/ImageUpload";
import ButtonAddPhoto from "../../NewPost/ButtonAddPhoto";

interface EditPostFormProps {
  post: PostData;
  onClose: (isOpen: boolean) => void;
}

export default function EditPostForm({ post, onClose }: EditPostFormProps) {
  

  const {
    handleTextareaChange,
    handleRemovePreview,
    handleUploadPhotoButtonClick,
    handleFileChange,
    textareaValue,
    previewUrl,
    fileInputRef,
    textareaRef,
  } = useNewPost({ initialPreviewUrl: post.image, initialTextareaValue: post.content });

  return (
    <form action="">
      <div className="flex flex-col">
        <Textarea
          ref={textareaRef}
          value={textareaValue || ""}
          onChange={handleTextareaChange}
          className="bg-background"
          placeholder="Escribe algo..."
        />
        <div className="w-fit">
          {previewUrl && (
            <PreviewImageToPost
              previewUrlSrc={previewUrl}
              handleRemovePreview={handleRemovePreview}
            />
          )}
        </div>
        <div className="mt-4 flex flex-col gap-4 justify-start items-start">
              
              <ButtonAddPhoto handleFileChange={handleFileChange} fileInputRef={fileInputRef} handleUploadPhotoButtonClick={handleUploadPhotoButtonClick} />
             <div className="w-full flex gap-2 justify-end">
             <Button type="button" variant={"outline"} size={"sm"} onClick={() => onClose(false)}>Cancelar</Button>

             <CaslaButton
              variant="blueToRed"
                className="relative z-10"
                size="sm"
                // onClick={handleSubmit}
                // disabled={(!textareaValue && !previewUrl) || mutation.isPending}
              >
                {/* {mutation.isPending ? "Publicando..." : "Publicar"} */}
                Publicar
              </CaslaButton>
             </div>
              

              
            </div>
      </div>
    </form>
  );
}
