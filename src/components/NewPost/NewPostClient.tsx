"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon, User } from "lucide-react";
import React,{useRef} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { User as UserType } from "@/types/User";
import Link from "next/link";
import { Input } from "../ui/input";
import PreviewImageDialogUploadImage from "../dashboard/profile/PreviewImageDialogUploadImage";
import { submitPost } from "./action";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";


interface NewPostProps {
  user: UserType | null;
}

export default function NewPost({ user }: NewPostProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [textareaValue, setTextareaValue] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const fallback = user?.name?.[0] || <User className="h-4 w-4" />
  const router = useRouter();

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value)
  }

  const handleSumbit = async() =>{
    try {
      const res = await submitPost(textareaValue, file);
      
      if (res.ok || res.SuccessMessage !== "") {
        
        toast({
          description: res.SuccessMessage,
          title: "Post created successfully",
          variant: "success",
        });
        
        
        
        if(fileInputRef.current) fileInputRef.current.value = ''
        if(textareaRef.current) textareaRef.current.value = ''
        setTextareaValue("")
        setFile(null);
        setPreviewUrl(null);
         router.refresh();
      } else {
        toast({
          description: res.error,
          title: "Post creation failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: error as string,
        title: "Profile creation failed",
        variant: "destructive",
      })
    }
   
    
  }

  const handleUploadPhotoButtonClick =()=>{
    fileInputRef.current?.click()
  }

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

  const handleRemovePreview = ()=>{
    setPreviewUrl(null);
    if(fileInputRef.current) fileInputRef.current.value = ''
  }


  return (
    <Card className="mb-6 bg-card">
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
            <Textarea ref={textareaRef} className='bg-background' placeholder="¿Qué estás pensando sobre el club?" onChange={handleTextareaChange} />
            <div className="w-fit">
              {previewUrl && (
              <PreviewImageDialogUploadImage
                previewUrlSrc={previewUrl}
                handleRemovePreview={handleRemovePreview}
              />
            )}
            </div>
            
            
            <div className="mt-2 flex justify-between items-center">
              <Button variant="outline" size="sm" onClick={handleUploadPhotoButtonClick}>
                <ImageIcon className="w-4 h-4 mr-2" />
                Agregar Foto
              </Button>
              <Input
                ref={fileInputRef}
                type='file'
                id='file'
                onChange={handleFileChange}
                className="hidden"
              />
              <Button className='relative z-10'  size="sm" onClick={handleSumbit} disabled={!textareaValue && !previewUrl}>Publicar</Button>
            </div>
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
