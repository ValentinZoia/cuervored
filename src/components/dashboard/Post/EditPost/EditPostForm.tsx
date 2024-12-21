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
      console.log(textareaValue, previewUrl);
      
      //verificamos que existan cambios a subir
      if (textareaValue === post.content && post.image === previewUrl) {
        toast({
          variant: "default",
          description: "No changes have been made",
          title: "Post update failed",
        });
        return;
      }

      let imageUrl = null;
      if (file) {
        //Transformamos la imagen a webp antes de subirla a cloudinary
        const tranfromedFile = await transformImageToWebp(file);

        //Verificamos si esa transformacion salio con exito
        if (!tranfromedFile) {
          throw new Error("Failed to transform image to webp");
        }

        //Subimos a Cloudinary
        const { data, error } = await uploadToCloudinary(tranfromedFile);
        if (error) {
          throw new Error("Failed to upload image");
        }

        //guardamos el link de la imagen en una variable
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

  //desabilitar el boton de publicar si se vuelve true esta condicion.
  const disabled = ((!textareaValue && !previewUrl) || mutation.isPending || textareaValue === post.content && post.image === previewUrl);

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
               disabled={disabled}
            >
              {mutation.isPending ? "Publicando..." : "Publicar"}
              
            </CaslaButton>
          </div>
        </div>
      </div>
    </form>
  );
}
