import React, { useState } from "react";
import { useDeletePostMutation } from "./mutations";
import { useSession } from "next-auth/react";
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
import { Trash2 } from "lucide-react";

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
  const session = useSession();
  const mutation = useDeletePostMutation();

  if (!session) return null;

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
            <Button type="button" variant="ghost" disabled={mutation.isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button type="button" variant="destructive" onClick={handleDelete}>
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
