import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PostData } from '@/types/Post';
import React from 'react'
import EditPostForm from './EditPostForm';



interface DialogEditPostProps {
post: PostData;
isOpen:boolean;
onClose: (isOpen: boolean) => void
}

export default function DialogEditPost({post, isOpen, onClose}: DialogEditPostProps) {

  
  
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Post</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <EditPostForm post={post} onClose={onClose} />
        </DialogContent>
      </Dialog>
  )
}
