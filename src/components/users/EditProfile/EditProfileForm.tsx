
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EditProfileUserSchema } from "@/lib/zodSchema";
import { UserData } from "@/types/User";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "./ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateProfileMutation } from "./mutation";
import { transformImageToWebp } from "@/utils/transformImageToWebP";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { toast } from "@/components/ui/use-toast";
import { CaslaButton } from "@/components/ui/CaslaButton";


interface EditProfileFormProps {
  user: UserData ;
  onClose: (isOpen: boolean) => void
}

type ProfileFormValues = z.infer<typeof EditProfileUserSchema>;

export default function EditProfileForm({ user, onClose }: EditProfileFormProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const mutation = useUpdateProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(EditProfileUserSchema),
    defaultValues: {
      username: user.name ? user.name : "",
      full_name: user.fullName ? user.fullName : "",
      bio: user.bio ? user.bio : "",
    },
  });

  const onSubmit = async (FormData: ProfileFormValues) => {
    
    //Verificar que existan cambios
    if(FormData.username === user.name && FormData.full_name === user.fullName && FormData.bio === user.bio && !file){
      toast({
        variant:"default",
        description:"No se han realizado cambios",
        title:"Actualización fallida"
      })
      return
    }


    let imageUrl = null;
    let image_100 = null;
    if(file){
      //Transformar imagenes a webp y comprimirlas antes de subir
      // Para imagen pequeña de perfil (en publicaciones)
      const smallProfileImage = await transformImageToWebp(file, "profileSmall");

      // Para imagen grande de perfil (en página de perfil)
      const largeProfileImage = await transformImageToWebp(file, "profileLarge");

      //Verify if transformedFile exists
      if(!smallProfileImage || !largeProfileImage){
        toast({
          variant: "destructive",
          description: "Error al procesar las imágenes. Por favor, intenta con otra imagen",
          title: "Error de procesamiento"
      });
      return;
      }
      

      
       // Subir a Cloudinary
       const [smallImageResult, largeImageResult] = await Promise.all([
        uploadToCloudinary(smallProfileImage),
        uploadToCloudinary(largeProfileImage)
    ]);

      if (smallImageResult.error || largeImageResult.error) {
        toast({
          variant: "destructive",
          description: "Error al procesar las imágenes. Por favor, intenta con otra imagen",
          title: "Error de procesamiento"
      });
      return;
      }

      imageUrl = smallImageResult.data;
      image_100 = largeImageResult.data;
    }
        



    mutation.mutate(
      {
        values: FormData,
        imageUrl,
        image_100,
      },
      {
        onSuccess: () => {
          onClose(false);
        },
      }
    )
  };

  return (
    <>
      <ImageUpload
        previewUrl={user.image_100 ? user.image_100 : ""}
        onChange={() => {}}
        className="mx-0"
        setFile={setFile}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CaslaButton type="submit" variant="blueToRed" aria-label="Guardar Cambios">
          {mutation.isPending ? "Guardando..." : "Guardar Cambios"}
          </CaslaButton>
        </form>
      </Form>
    </>
  );
}
