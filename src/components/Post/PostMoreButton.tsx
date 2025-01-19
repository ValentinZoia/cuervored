
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostData } from "@/types/Post";

import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";

import React, { useState } from "react";
import DialogDeletePost from "./DialogDeletePost";
import DialogEditPost from "./EditPost/DialogEditPost";
interface DropDownMenuPostsProps {
  post: PostData;
  className?: string;
}
export default function PostMoreButton({
  post,
  className,
}: DropDownMenuPostsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className={className} aria-label="Opciones">
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setShowEditDialog(true)}>
              <Edit2 className="mr-2 h-4 w-4" />
              <p>Editar</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              <p className="text-red-500">Eliminar</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogDeletePost
        postId={post.id}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />

      <DialogEditPost
      post={post}
      isOpen={showEditDialog}
      onClose={setShowEditDialog}
      />

      
    </>
  );
}
