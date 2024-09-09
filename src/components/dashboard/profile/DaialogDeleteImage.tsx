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
          className=" hover:text-white hover:bg-red-500"
        >
          <Trash2 className="mr-2 h-5 w-5" />
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. It will permanently delete your Image
            Account. You can upload a new Image Account on the Profile Page
            afterward."
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={removeImage}>
              Yes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
