"use client";
import { Textarea } from "@/components/ui/textarea";
import { useNewPost } from "@/hooks/useNewPost";
import { PostData } from "@/types/Post";
import React, { useCallback, useMemo } from "react";
import PreviewImageToPost from "../../NewPost/PreviewImageToPost";
import { Button } from "@/components/ui/button";
import { CaslaButton } from "@/components/ui/CaslaButton";
import ButtonAddPhoto from "../../NewPost/ButtonAddPhoto";
import { toast } from "@/components/ui/use-toast";
import { transformImageToWebp } from "@/utils/transformImageToWebP";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { useUpdatePostMutation } from "./mutation";

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

  /*
  - Porque Utilizo useCallBack en handldesubmit?
  useCallback se utiliza para memorizar funciones y evitar
  que se vuelvan a crear en cada renderizado, a menos que cambien
  sus dependencias. Esto es útil para optimizar el rendimiento,
  especialmente cuando se pasan funciones a componentes hijos
   que podrían desencadenar renderizados innecesarios.
   La funcion handleSubmit se volvera a crear si cambia una de sus dependencias []
  */
  const handleSubmit = useCallback(async () => {
    try {
      //verificamos que existan cambios a subir
      if (textareaValue === post.content && post.image === previewUrl) {
        toast({
          variant: "default",
          description: "No se han realizado cambios",
          title: "Post actualización fallida",
        });
        return;
      }

      let imageUrl:string | null = null;
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
          content: textareaValue || null,
          imageUrl,
          postId: post.id,
        },
        {
          onSuccess: () => {
            onClose(false);
          },
        }
      );
    } catch (error: any) {
      toast({
        description: (error.message as string) || "Error al actualizar el post",
        title: "Post actualización fallida",
        variant: "destructive",
      });
    }
  }, [textareaValue, previewUrl, file, post, mutation, onClose]);



  /*
   - Porque Utilizo useMemo en disabled?
  useMemo se utiliza para memorizar valores calculados y evitar
  que se vuelvan a calcular en cada renderizado, a menos que cambien
  sus dependencias. Esto es útil para optimizar el rendimiento.
  */
  // Deshabilitar el botón si:
  // - El contenido está vacío
  // - No hubo cambios en el contenido
  // - La mutación está en progreso o el formulario está enviando
  const disabled = useMemo(() => 
    (!textareaValue && !previewUrl) ||
    mutation.isPending ||
    (textareaValue === post.content && post.image === previewUrl),
    [textareaValue, previewUrl, mutation.isPending, post.content, post.image]
  );

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
              {mutation.isPending ? "Guardando..." : "Guardar Cambios"}
            </CaslaButton>
          </div>
        </div>
      </div>
    </form>
  );
}
