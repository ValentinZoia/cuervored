import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import { updateProfile, deleteImage, deleteAccount } from '@/app/dashboard/profile/action';

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
    typeUpload: 'url',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const id = session?.user?.id;

  useEffect(() => {
    if (name !== initialName || image.src !== initialImage) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [name, image, initialName, initialImage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imageSrc: string = image.src;
    
    const res = await updateProfile({ name, imageSrc });

    if (res.ok || res.message !== "") {
      toast({
        description: res.message,
        title: "Profile updated",
        variant: "success",
      });
      setShowAlert(false);
      router.refresh();
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

    if (res.ok || res.message !== "") {
      toast({
        description: res.message,
        title: "Profile updated",
        variant: "default",
      });
      setImage({ src: "", typeUpload: null });
      router.refresh();
    } else {
      toast({
        description: res.error,
        title: "Profile update failed",
        variant: "destructive",
      });
    }
    router.refresh();
  };

  const removeAccount = async () => {
    const res = await deleteAccount({ id });
    if (res.ok || res.message !== "") {
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
  };
}