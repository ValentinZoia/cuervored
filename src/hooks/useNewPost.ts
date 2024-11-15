import React, { useRef } from "react";
import { submitPost } from "@/components/dashboard/NewPost/action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { transformImageToWebp } from "@/utils/transformImageToWebP";
import { text } from "stream/consumers";
export const useNewPost = () => {
  const user = useSession().data?.user;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [textareaValue, setTextareaValue] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();
  console.log(useSession())
  

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
    onSuccess: (data) => {
      if (data.ok || data.SuccessMessage !== "") {
        toast({
          description: data.SuccessMessage,
          title: "Post created successfully",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["posts"]
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
        description: error.message || "Failed to create post",
        title: "Post creation failed",
        variant: "destructive",
      });
    },
  });

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(e.target.value === ''){
      setTextareaValue(null);
    }
    setTextareaValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = null;

      if (file) {
        //Transform image to webp before uploading
        const tranfromedFile = await transformImageToWebp(file);

        //Verify if transformedFile exists
        if(!tranfromedFile){
          throw new Error("Failed to transform image to webp");
        }
        console.log(tranfromedFile)

        //Upload to Cloudinary
        const{data, error} = await uploadToCloudinary(tranfromedFile);
        if (error) {
          throw new Error("Failed to upload image");
        }
        imageUrl = data;
      }
      console.log(!!textareaValue);
      mutation.mutate({ content: (!!textareaValue ? textareaValue : null) , imageUrl });
    } catch (error: any) {
      toast({
        description: (error.message as string) || "Failed to create post",
        title: "Post creation failed",
        variant: "destructive",
      });
    }
  };

  const handleUploadPhotoButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPreviewUrl(event.target.result as string);
          setFile(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
    user,
  };
};
