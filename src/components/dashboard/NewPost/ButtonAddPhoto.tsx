import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { ImageIcon } from 'lucide-react'
import React from 'react'

interface ButtonAddPhotoProps {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleUploadPhotoButtonClick: () => void
}
export default function ButtonAddPhoto({handleFileChange, fileInputRef, handleUploadPhotoButtonClick}: ButtonAddPhotoProps) {
  return (
    <div>
        <Button
                variant="outline"
                type="button"
                size="sm"
                 onClick={handleUploadPhotoButtonClick}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Agregar Foto
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                id="file"
                onChange={handleFileChange}
                className="hidden"
              />
    </div>
  )
}
