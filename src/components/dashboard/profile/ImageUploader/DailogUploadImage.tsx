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
import { Plus, Upload} from "lucide-react";
import React, { useEffect, useReducer, useRef, useState } from "react";
import PreviewImageDialogUploadImage from "../PreviewImageDialogUploadImage";
import { imageUploaderReducer, initialState } from "./imageUploaderReducer";

interface ImageState {
  src: string;
  typeUpload: 'file' | 'url' | null;
}

interface DailogUploadImageProps {
  imageSrc: string;
  typeUpload: 'file' | 'url' | null;
  setImage: React.Dispatch<React.SetStateAction<ImageState>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function DailogUploadImage({
  imageSrc,
  typeUpload,
  setImage,
  setFile,
}: DailogUploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(imageUploaderReducer, initialState);
  
  useEffect(() => {
    if(state.isOpen){
      dispatch({type:'SET_INITIAL_STATE', payload: {imageSrc, typeUpload}})
    }
  }, [state.isOpen, imageSrc, typeUpload]);
  
  
  // handleClick to input Upload photo
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = ()=>{
    
    if (state.previewUrl && state.previewType) {
      
      setImage({ src: state.previewUrl, typeUpload: state.previewType });
      setFile(state.file);
    }
    dispatch({type:"TOGGLE_DIALOG", payload: false})
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      //creating a reader to read the file and create an URL.
      const reader = new FileReader();
      reader.onload = () => {
        dispatch({type:'SET_FILE', payload:{previewType:'file', previewUrl: reader.result as string,file: file}})
        
      };
      reader.readAsDataURL(file);
      
      
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    dispatch({type:'SET_URL', payload:{previewUrl: newUrl, typeUpload: 'url'}})
  };

  const handleRemovePreview = () => {
    dispatch({type:'REMOVE_PREVIEW'})
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (urlInputRef.current) {
      urlInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={state.isOpen} onOpenChange={(isOpen) => dispatch({ type: 'TOGGLE_DIALOG', payload: isOpen })}>
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
            value={state.previewType === 'url' ? state.previewUrl as string : ''}
            onChange={handleUrlChange}
            placeholder="https://example.com/avatar.jpg"
            disabled={state.previewType === 'file'}
            
          />

          {state.previewUrl && state.previewType === 'url' && <PreviewImageDialogUploadImage previewUrlSrc={state.previewUrl} handleRemovePreview={handleRemovePreview} />}

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
            disabled={!!state.previewUrl}
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
          {state.previewUrl && state.previewType === 'file' && <PreviewImageDialogUploadImage previewUrlSrc={state.previewUrl} handleRemovePreview={handleRemovePreview} />}
        
      
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
