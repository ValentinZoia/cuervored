
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { UserData } from '@/types/User'
import React from 'react'
import EditProfileForm from "./EditProfileForm";

interface EditProfileDialogProps {
    user: UserData
    isOpen: boolean
    onClose: (isOpen: boolean) => void
}

export default function EditProfileDialog({user, isOpen, onClose}: EditProfileDialogProps) {
  
  
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EditProfileForm user={user} onClose={onClose}  />
      </DialogContent>
    </Dialog>
  )
}
