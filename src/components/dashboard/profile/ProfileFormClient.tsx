"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteImage, updateProfile, deleteAccount } from "@/app/dashboard/profile/action";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import DialogImage from "./DialogImage";
import DailogUploadImage from "./DailogUploadImage";
import DailogDeleteImage from "./DaialogDeleteImage";
import DailogDeleteAccount from "./DialogDeleteAccount";

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
  const { data: session } = useSession();
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

  const removeImage = async () => {
    const res = await deleteImage({ id });

    if (res.message !== "") {
      toast({
        description: res.message,
        title: "Profile updated",
        variant: "success",
      });
      setImage("");
      router.refresh();
    } else {
      toast({
        description: res.error,
        title: "Profile update failed",
        variant: "destructive",
      });
    }
    router.refresh();
    console.log(image);
  };

  const removeAccount = async () => {
    console.log(id)
    const res = await deleteAccount({ id });
    if (res.message !== "") {
      toast({
        description: res.message,
        title: "Account deleted successfully",
        variant: "success",
      });
      
      router.refresh();
      router.push("/auth/login");
    } else {
      toast({
        description: res.error,
        title: "Account deletion failed",
        variant: "destructive",
      });
    }
    router.refresh();
    
    
  }

  if (!session) {
    return(
      <>
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="text-3xl">Cargando...</h1>
      </div>
      </>
    )
  }

  if(!session?.user?.id){
    return(
      <>
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="text-3xl">Cargando...</h1>
      </div>
      </>
    )
  }

  return (
    <>
      <DialogImage
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        nameImage={name}
        srcImage={image}
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-8 p-5 bg-background rounded-md border-slate-200 border-[1px] ">
          <div className="">
            <Avatar
              className="h-20 w-20 cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            >
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <DailogUploadImage image={image} setImage={setImage} />
            </div>
            <div>
              <DailogDeleteImage removeImage={removeImage} />
            </div>
          </div>
        </div>
        <div className="space-y-12 p-5 bg-background rounded-md border-slate-200 border-[1px]">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="flex justify-between">
            <Button type="submit" variant="blue">
              Save Change
            </Button>
            <DailogDeleteAccount removeAccount={removeAccount} />
            
          </div>
        </div>
      </form>
    </>
  );
}
