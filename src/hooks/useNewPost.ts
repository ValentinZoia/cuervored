import React, { useRef } from "react";
import { submitPost } from "@/components/dashboard/NewPost/action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
export const useNewPost = () => {
  const user = useSession().data?.user;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [textareaValue, setTextareaValue] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      content,
      imageUrl,
    }: {
      content: string;
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
        queryClient.invalidateQueries({ queryKey: ["posts"] });
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
    setTextareaValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = null;

      if (file) {
        const { data, error } = await uploadToCloudinary(file);
        if (error) {
          throw new Error("Failed to upload image");
        }
        imageUrl = data;
      }

      mutation.mutate({ content: textareaValue, imageUrl });
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
