"use client"

import { useCallback, useState } from "react"
import { CameraIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ImageUploadProps {
  value: string | undefined
  onChange: (value: string) => void
  className?: string
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}

export function ImageUpload({ value, onChange, className, setFile }: ImageUploadProps) {
  const [preview, setPreview] = useState(value)

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
          onChange(reader.result as string)
          setFile(file)
        }
        reader.readAsDataURL(file)
      }
    },
    [onChange]
  )

  return (
    <div className={className}>
      <label
        htmlFor="image-upload"
        className="relative cursor-pointer inline-block"
      >
        <Avatar className="h-24 w-24">
          <AvatarImage src={preview} alt="Profile picture" />
          <AvatarFallback>
            <CameraIcon className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
          <CameraIcon className="h-8 w-8 text-white" />
        </div>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}