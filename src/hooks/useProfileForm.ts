import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import { updateProfile, deleteImage, deleteAccount } from '@/app/dashboard/profile/action';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { transformImageToWebp } from '@/utils/transformImageToWebP';

interface ImageState {
  src: string;
  typeUpload: 'file' | 'url' | null;
}

interface UseProfileFormProps {
  initialName: string;
  initialImage: string;
}

export function useProfileForm({ initialName, initialImage }: UseProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState<ImageState>({
    src: initialImage,
    typeUpload: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();
  const id = session?.user?.id;

  useEffect(() => {
    if (name !== initialName || image.src !== initialImage ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [name, image, initialName, initialImage]);

  


  //update profile
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(name === initialName && image.src === initialImage){
      toast({
        description: "You should do a change before update",
        title: "Profile update failed",
        variant: "default",
      });
      return;
    }
    
    
    
    let imageSrc: string = image.src;

    if(image.typeUpload === 'file' && file){
      try {

        //Transform image to webp before uploading
        const tranfromedFile = await transformImageToWebp(file);

        //Verify if transformedFile exists
        if(!tranfromedFile){
          throw new Error("Failed to transform image to webp");
        }
        

        //Upload to Cloudinary
        const{data, error} = await uploadToCloudinary(tranfromedFile);
        if(error){
          throw new Error("Failed to upload image to Cloudinary");
        }

        imageSrc = data;

        
      } catch (error) {
        toast({
          description: "Failed to upload image to Cloudinary",
          title: "Profile update failed",
          variant: "destructive",
        });
        return;
      }
    }

    try{
      const res = await updateProfile({ name, imageSrc });



      if (res.ok) {

        update({
          ...session,
          user: {
            ...session?.user,
            name,
            image: imageSrc,
          },
        })
        


        toast({
          description: res.message,
          title: "Profile updated",
          variant: "success",
        });
        setImage({src: imageSrc, typeUpload: image.typeUpload});
        setShowAlert(false);
        router.refresh();
        // useSession().update();

      } else {
        toast({
          description: res.error,
          title: "Profile update failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "Failed to update profile",
        title: "Profile update failed",
        variant: "destructive",
      })
    }
    
   
    router.refresh();
  };

  const removeImage = async () => {
    try {
      const res = await deleteImage({ id });

      if (res.ok ) {
        toast({
          description: res.message,
          title: "Profile updated",
          variant: "default",
        });
        setImage({ src: "", typeUpload: null });
        router.refresh();
      } else{
        toast({
          description: res.error,
          title: "Profile update failed",
          variant: "destructive",
        });
      }

    } catch (error) {
      toast({
        description: "Failed to delete image",
        title: "Profile update failed",
        variant: "destructive",
      })
    }

    router.refresh();
  };

  const removeAccount = async () => {
    try {
      const res = await deleteAccount({ id });
      if (res.ok) {
        toast({
          description: res.message,
          title: "Account deleted successfully",
          variant: "default",
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
    } catch (error) {
      toast({
        description: "Failed to delete account",
        title: "Account deletion failed",
        variant: "destructive",
      })
    }

    router.refresh();
  };



  return {
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
    setFile,
  };
}