"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Input } from "../../ui/input";
import PreviewImageDialogUploadImage from "../profile/PreviewImageDialogUploadImage";
import { useNewPost } from "@/hooks/useNewPost";



export default function NewPost() {
  

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
    user,
  } = useNewPost();

  if(!user) return null

  const fallback = user?.name?.[0] || <User className="h-4 w-4" />;

  return (
    <Card className="max-w-[680px] mb-6 bg-card">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Link href="/dashboard/profile">
            <Avatar>
              {user?.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.name || "User avatar"}
                />
              ) : null}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              className="bg-background"
              placeholder="¿Qué estás pensando sobre el club?"
              onChange={handleTextareaChange}
            />
            <div className="w-fit">
              {previewUrl && (
                <PreviewImageDialogUploadImage
                  previewUrlSrc={previewUrl}
                  handleRemovePreview={handleRemovePreview}
                />
              )}
            </div>

            <div className="mt-2 flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleUploadPhotoButtonClick}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Agregar Foto
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                id="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                className="relative z-10"
                size="sm"
                onClick={handleSubmit}
                disabled={(!textareaValue && !previewUrl) || mutation.isPending}
              >
                {mutation.isPending ? "Publicando..." : "Publicar"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
