"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import PreviwImageDialogUploadImage from "./PreviwImageDialogUploadImage";

interface ImageState {
  src: string;
  typeUpload: 'file' | 'url' | null;
}

interface DailogUploadImageProps {
  imageSrc: string;
  typeUpload: 'file' | 'url' | null;
  setImage: React.Dispatch<React.SetStateAction<ImageState>>;
}

export default function DailogUploadImage({
  imageSrc,
  typeUpload,
  setImage,
}: DailogUploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'file' | 'url' | null>(null);
  const [initialImage, setInitialImage] = useState<string>(imageSrc)
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (isOpen) {

      setInitialImage(imageSrc);
      setPreviewUrl(imageSrc);
      setPreviewType(typeUpload);
      console.log("Primero", previewType, initialImage, previewUrl)
    }
  }, [isOpen, imageSrc, typeUpload]);
  
  
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = ()=>{
    
    if (previewUrl && previewType) {
      setImage({ src: previewUrl, typeUpload: previewType });
    }
    setIsOpen(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      //creating a reader to read the file and create an URL.
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
        setInitialImage(reader.result as string);
        setPreviewType('file');
        console.log("Paso yo pa", previewType)
      };
      reader.readAsDataURL(file);
      
      
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Estoy pasnado ", previewType)
    const newUrl = e.target.value;
    setInitialImage(newUrl);
    setPreviewUrl(newUrl);
    setPreviewType('url');
  };

  const handleRemovePreview = () => {
    setPreviewUrl(null);
    setPreviewType(null);
    setInitialImage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (urlInputRef.current) {
      urlInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500 w-[115px]"
        >
          <Upload className="mr-2 h-5 w-5" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
      <DialogTitle>Umpload your profile picture</DialogTitle>
        <DialogHeader>
          
          <DialogDescription>
            Remember Click on{" "}
            <span className="font-bold text-blue-500">Save Change</span> after
            any changes.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-start flex-col gap-2">
          <Label htmlFor="image">Profile Photo URL</Label>
          <Input
            id="image"
            ref={urlInputRef}
            value={previewType === 'url' ? initialImage: ''}
            onChange={handleUrlChange}
            placeholder="https://example.com/avatar.jpg"
            disabled={previewType === 'file'}
            
          />

          {previewUrl && previewType === 'url' && <PreviwImageDialogUploadImage previewUrlSrc={initialImage} handleRemovePreview={handleRemovePreview} />}

        </div>

        <div className="flex justify-center items-center gap-2">
          <hr className="w-1/2 " />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="w-1/2" />
        </div>

        <div className="flex justify-center items-start flex-col">
          <Button
            variant="blue"
            className="w-full"
            onClick={handleClick}
            disabled={!!previewUrl}
          >
            <Plus className="mr-2 h-4 w-4" /> Upload photo
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            id="image"
            onChange={handleFileChange}
            className="hidden"
          />
          {previewUrl && previewType === 'file' && <PreviwImageDialogUploadImage previewUrlSrc={previewUrl} handleRemovePreview={handleRemovePreview} />}
        
      
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          
            <Button type="button" variant="default" onClick={handleSubmit}>
              Ok
            </Button>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
