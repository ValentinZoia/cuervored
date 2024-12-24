import { Dialog,DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react'
import EditCommentForm from './EditCommentForm';

interface EditCommentDialogProps {
  commentId: string;
  commentContent: string;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}



export default function EditCommentDialog({commentId, commentContent, isOpen, onClose}: EditCommentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Comentario</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
         <EditCommentForm commentContent={commentContent} commentId={commentId} onClose={onClose} /> 
      </DialogContent>
    </Dialog>
  )
}
