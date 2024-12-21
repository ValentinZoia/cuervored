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
import { toast } from "@/components/ui/use-toast";
import { transformImageToWebp } from "@/utils/transformImageToWebP";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { useUpdatePostMutation } from "./mutation";
import { text } from "stream/consumers";

interface EditPostFormProps {
  post: PostData;
  onClose: (isOpen: boolean) => void;
}

export default function EditPostForm({ post, onClose }: EditPostFormProps) {
  const mutation = useUpdatePostMutation();

  const {
    handleTextareaChange,
    handleRemovePreview,
    handleUploadPhotoButtonClick,
    handleFileChange,
    textareaValue,
    previewUrl,
    fileInputRef,
    textareaRef,
    file,
  } = useNewPost({
    initialPreviewUrl: post.image,
    initialTextareaValue: post.content,
  });

  
  const handleSubmit = async () => {
    try {
      
      //check if there are no changes
      if (textareaValue === post.content) {
        toast({
          variant: "default",
          description: "No changes have been made",
          title: "Post update failed",
        });
        return;
      }

      let imageUrl = null;
      if (file) {
        //Transform image to webp before uploading
        const tranfromedFile = await transformImageToWebp(file);

        //Verify if transformedFile exists
        if (!tranfromedFile) {
          throw new Error("Failed to transform image to webp");
        }

        //Upload to Cloudinary
        const { data, error } = await uploadToCloudinary(tranfromedFile);
        if (error) {
          throw new Error("Failed to upload image");
        }

        imageUrl = data;
      }

      
      mutation.mutate(
        {
          content: !!textareaValue ? textareaValue : null,
          imageUrl,
          postId: post.id,
        },
        {
          onSuccess: () => {
            onClose(false);
          },
        }
      );
    } catch (error:any) {
      console.log(error.message as string);
      toast({
        description: (error.message as string) || "Failed to update post",
        title: "Post update failed",
        variant: "destructive",
      });
    }
  };

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
          <ButtonAddPhoto
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            handleUploadPhotoButtonClick={handleUploadPhotoButtonClick}
          />
          <div className="w-full flex gap-2 justify-end">
            <Button
              type="button"
              variant={"outline"}
              size={"sm"}
              onClick={() => onClose(false)}
            >
              Cancelar
            </Button>

            <CaslaButton
              variant="blueToRed"
              className="relative z-10"
              type="button"
              size="sm"
               onClick={handleSubmit}
               disabled={(!textareaValue && !previewUrl) || mutation.isPending}
            >
              {mutation.isPending ? "Publicando..." : "Publicar"}
              
            </CaslaButton>
          </div>
        </div>
      </div>
    </form>
  );
}
