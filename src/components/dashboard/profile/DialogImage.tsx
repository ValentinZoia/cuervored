"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog";


interface DialogImageProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    nameImage: string;
    srcImage: string;
    
}

export default function DialogImage({isDialogOpen, setIsDialogOpen, nameImage, srcImage}: DialogImageProps) {
  return (
    <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[625px] p-14 shadow-none text-white  bg-transparent border-transparent">
        
          <div className="">
            <img src={srcImage} alt={nameImage} className="w-full h-auto" />
          </div>
        </DialogContent>
      </Dialog>
  )
}
