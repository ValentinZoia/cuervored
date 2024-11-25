import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EditProfileUserSchema } from "@/lib/zodSchema";
import { UserData } from "@/types/Post";
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

interface EditProfileFormProps {
  user: UserData;
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
    
    //Check if there are no changes
    if(FormData.username === user.name && FormData.full_name === user.fullName && FormData.bio === user.bio){
      toast({
        variant:"default",
        description:"No changes have been made",
        title:"Profile update failed"
      })
      return
    }


    let imageUrl = null;
    if(file){
      //Transform image to webp before uploading
      const tranfromedFile = await transformImageToWebp(file);

      //Verify if transformedFile exists
      if(!tranfromedFile){
        throw new Error("Failed to transform image to webp");
      }
      

      //Upload to Cloudinary
      const{data, error} = await uploadToCloudinary(tranfromedFile);
      if (error) {
        throw new Error("Failed to upload image");
      }

      imageUrl = data;
    }
        



    mutation.mutate(
      {
        values: FormData,
        imageUrl,
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
        value={user.image ? user.image : ""}
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

          <Button type="submit">Save changes</Button>
        </form>
      </Form>
    </>
  );
}
