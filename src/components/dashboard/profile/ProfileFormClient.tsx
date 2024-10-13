"use client";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DialogImage from "./DialogImage";
import DailogUploadImage from "./ImageUploader/DailogUploadImage";
import DailogDeleteImage from "./DaialogDeleteImage";
import DailogDeleteAccount from "./DialogDeleteAccount";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {useProfileForm} from "@/hooks/useProfileForm";


interface ProfileFormClientProps {
  initialName: string;
  initialImage: string;
}

export default function ProfileFormClient({
  initialName,
  initialImage,
}: ProfileFormClientProps) {
  

  const {
    name,
    setName,
    image,
    setImage,
    isDialogOpen,
    setIsDialogOpen,
    showAlert,
    handleSubmit,
    removeImage,
    removeAccount,
    session,
  } = useProfileForm({ initialName, initialImage });


  if (!session) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className="text-3xl">Cargando...</h1>
        </div>
      </>
    );
  }

  if (!session?.user?.id) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className="text-3xl">Cargando...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <DialogImage
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        nameImage={name}
        srcImage={image.src}
      />

      {showAlert && (
        <Alert variant="default" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Changes have been made. Don't forget to click <span className="font-bold text-blue-500">Save Changes</span>  to save
            your updates.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-8 p-5 bg-card rounded-md border-slate-200 border-[1px] ">
          <div className="">
            <Avatar
              className="h-20 w-20 cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            >
              <AvatarImage src={image.src} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-center flex-col gap-4 justify-center sm:flex-row">
            <div>
              <DailogUploadImage
                imageSrc={image.src}
                typeUpload={image.typeUpload}
                setImage={setImage}
              />
            </div>
            <div>
              <DailogDeleteImage removeImage={removeImage} />
            </div>
          </div>
        </div>
        <div className="space-y-12 p-5 bg-card rounded-md border-slate-200 border-[1px]">
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
              Save Changes
            </Button>
            <DailogDeleteAccount removeAccount={removeAccount} />
          </div>
        </div>
      </form>
    </>
  );
}
