import { UserData } from '@/types/Post'
import React from 'react'

interface EditProfileDialogProps {
    user: UserData
    isOpen: boolean
    onClose: () => void
}

export default function EditProfileDialog({user, isOpen, onClose}: EditProfileDialogProps) {
  return (
    <div>EditProfileDialog</div>
  )
}
