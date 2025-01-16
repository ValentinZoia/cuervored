import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface PreviewImageDialogUploadImageProps {
    previewUrlSrc: string
    handleRemovePreview: () => void
}

export default function PreviewImageToPost({previewUrlSrc, handleRemovePreview}: PreviewImageDialogUploadImageProps) {
  return (
    <div className="relative mt-4 rounded-lg overflow-hidden shadow-md">
          {/* <img src={previewUrlSrc} alt="Preview" className="w-32 h-32 object-cover" /> */}
          <Image src={previewUrlSrc} alt="Preview" width={128} height={128} className="w-32 h-32 object-cover" />
          <Button
            aria-label='Eliminar imagen'
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={handleRemovePreview}
          >
            <X className="h-4 w-4" aria-hidden="true"/>
          </Button>
        </div>
  )
}
