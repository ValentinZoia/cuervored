import React from "react";
import { useDeletePostMutation } from "./mutations";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface DialogDeletePostProps {
  postId: string;
  open: boolean;
  onClose: () => void;
}

export default function DialogDeletePost({
  postId,
  open,
  onClose,
}: DialogDeletePostProps) {

  const mutation = useDeletePostMutation();



  const handleOpenChange = (open: boolean) => {
    if (!open || !mutation.isPending) {
      onClose();
    }
  };

  const handleDelete = () => {
    mutation.mutate(
      { id: postId },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete post?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between gap-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={mutation.isPending} aria-label="Cancelar">
              Cancel
            </Button>
          </DialogClose>

          <Button type="button" variant="destructive" onClick={handleDelete} aria-label="Eliminar">
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
