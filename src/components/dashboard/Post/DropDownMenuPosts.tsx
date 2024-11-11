import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/types/Post";
import { Dialog } from "@radix-ui/react-dialog";

import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";

import React, { useState } from "react";
import DialogDeletePost from "./DialogDeletePost";
interface DropDownMenuPostsProps {
  post: Post;
  className?: string;
}
export default function DropDownMenuPosts({
  post,
  className,
}: DropDownMenuPostsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className={className}>
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <Edit2 className="mr-2 h-4 w-4" />
              <p>Edit</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              <p className="text-red-500">Delete</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogDeletePost
        postId={post.id}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
