"use client"
import { Button } from '@/components/ui/button'
import { DialogDescription,Dialog,DialogTrigger, DialogHeader, DialogContent, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import React from 'react'

interface DailogUploadImageProps {
    image: string,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    
}

export default function DailogUploadImage({image, setImage}: DailogUploadImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' variant="outline" className='text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500'>
            <Upload className="mr-2 h-5 w-5"/>
            Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Umpload your Image Account</DialogTitle>
          <DialogDescription>Remember Click on <span className='font-bold text-blue-500'>Save Change</span> after any changes.</DialogDescription>
          
        </DialogHeader>
        <div>
        <Label htmlFor="image">Profile Image URL</Label>
          <Input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="default">Ok</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
