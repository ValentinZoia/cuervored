import React, { useCallback, useRef, useState } from "react";
import { submitPost } from "@/components/NewPost/action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { useQueryClient, useMutation, QueryFilters, InfiniteData } from "@tanstack/react-query";
import { transformImageToWebp } from "@/utils/transformImageToWebP";
import { PostFeedType, PostsPage, QueryKeys } from "@/types/Post";

interface useNewPostProps {
  initialPreviewUrl: string | null;

  initialTextareaValue: string | null;
}

export const useNewPost = ({
  initialPreviewUrl,
  initialTextareaValue,
}: useNewPostProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialPreviewUrl
  );
  const [textareaValue, setTextareaValue] = useState<string | null>(
    initialTextareaValue
  );
  const [file, setFile] = React.useState<File | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      content,
      imageUrl,
    }: {
      content: string | null;
      imageUrl: string | null;
    }) => {
      return submitPost(content, imageUrl);
    },
    onSuccess:async (data) => {
      if (data.ok) {
        const queryFilter = {
          queryKey: [PostFeedType.POST_FEED],
          predicate(query) {
            return (
              query.queryKey.includes(PostFeedType.FOR_YOU) ||
              (query.queryKey.includes(QueryKeys.USER_POSTS))
            );
          },
        } satisfies QueryFilters;
  
        await queryClient.cancelQueries(queryFilter);
  
        queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
          queryFilter,
          (oldData) => {
            if (!oldData) return undefined;
        
            const firstPage = oldData.pages[0];
        
            if (firstPage) {
              const newPosts = data.newPost
                ? [data.newPost, ...firstPage.posts] // Agrega `data.newPost` si existe
                : firstPage.posts; // De lo contrario, usa solo los posts existentes
        
              return {
                ...oldData,
                pages: [
                  {
                    ...firstPage,
                    posts: newPosts, // Aseguramos que este arreglo es válido
                  },
                  ...oldData.pages.slice(1),
                ],
              };
            }
        
            return oldData; // Si no hay `firstPage`, devolvemos los datos anteriores.
          }
        );
  
        queryClient.invalidateQueries({
          queryKey: queryFilter.queryKey,
          predicate(query) {
            return queryFilter.predicate(query) && !query.state.data;
          },
        });
        
        
        
        
        
        
        
        toast({
          description: data.SuccessMessage,
          title: "Post creado exitosamente",
          variant: "success",
        });
        
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (textareaRef.current) textareaRef.current.value = "";
        setTextareaValue("");
        setFile(null);
        setPreviewUrl(null);
        router.refresh();
      } else {
        throw new Error(data.error || "Failed to create post");
      }
    },
    onError: (error: Error) => {
      toast({
        description: error.message || "Error al crear el post",
        title: "Post creacion fallida",
        variant: "destructive",
      });
    },
  });

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === "") {
      setTextareaValue(null);
    }
    setTextareaValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = null;

      if (file) {
        //Transform image to webp before uploading
        const tranfromedFile = await transformImageToWebp(file,"post");

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
      
      mutation.mutate({
        content: !!textareaValue ? textareaValue : null,
        imageUrl,
      });
    } catch (error: any) {
      toast({
        description: (error.message as string) || "Error al crear el post",
        title: "Post creacion fallida",
        variant: "destructive",
      });
    }
  };

  const handleUploadPhotoButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setPreviewUrl(reader.result as string)
            // onChange(reader.result as string)
            setFile(file)
          }
          reader.readAsDataURL(file)
        }
      },
      []
    )

  const handleRemovePreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return {
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
    setFile,
    file,
  };
};
