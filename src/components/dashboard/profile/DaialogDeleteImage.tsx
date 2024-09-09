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
import { Trash2 } from "lucide-react";
import React from "react";

interface DialogDeleteImageProps {
  removeImage: () => void;
}

export default function DailogDeleteImage({
  removeImage,
}: DialogDeleteImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className=" hover:text-white hover:bg-red-500 w-[115px]"
        >
          <Trash2 className="mr-2 h-5 w-5" />
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Image Account</DialogTitle>
          <DialogDescription>
          Are you sure you want to remove this Image? You can upload a new Image Account on the Profile Page
            afterward.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between gap-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={removeImage}>
              Remove
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
