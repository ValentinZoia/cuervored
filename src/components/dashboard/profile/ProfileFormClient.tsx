"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteImage, updateProfile } from "@/app/dashboard/profile/action";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent,DialogTitle } from "@/components/ui/dialog";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Delete, DeleteIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

interface ProfileFormClientProps {
  initialName: string;
  initialImage: string;
}

export default function ProfileFormClient({
  initialName,
  initialImage,
}: ProfileFormClientProps) {
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const {data: session} = useSession();
  const id = session?.user?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateProfile({ name, image });
    
    if (res.message !== "") {
      toast({
        description: res.message,
        title: "Profile updated",
        variant: "success",
      });
    } else {
      toast({
        description: res.error,
        title: "Profile update failed",
        variant: "destructive",
      });
    }
    router.refresh();
  };

  const removeImage = async()=>{
    const res = await deleteImage({id});
    router.refresh();
    if (res.message !== "") {
      toast({
        description: res.message,
        title: "Profile updated",
        variant: "success",
      });
      router.refresh();
    } else {
      toast({
        description: res.error,
        title: "Profile update failed",
        variant: "destructive",
      });
    }
    router.refresh();
  }

  

  return (
    <>
    
      <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[625px] ">
          <DialogHeader>
            
          </DialogHeader>
          <div className="">
            <img src={image} alt={name} className="w-full h-auto" />
          </div>
        </DialogContent>
      </Dialog>
    
    


    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="">
          
              <Avatar className="h-20 w-20 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
                <AvatarImage src={image} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
            
        </div>

        <div>
          <Label htmlFor="image">Profile Image URL</Label>
          <Input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
        <div>
          <Button type="button" variant="outline" onClick={removeImage}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Image
            </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <Button type="submit">Update Profile</Button>
    </form>
    </>
  );
}
