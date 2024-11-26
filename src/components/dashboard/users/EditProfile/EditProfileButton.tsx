"use client";
import { Button } from "@/components/ui/button";
import { UserData } from "@/types/Post";
import React, { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";
import { EditIcon } from "lucide-react";
import { CaslaButton } from "@/components/ui/CaslaButton";

interface EditProfileButtonProps {
  user: UserData;
}

export default function EditProfileButton({ user }: EditProfileButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
     

      <CaslaButton variant="blueToRed" onClick={() => setShowDialog(true)} className="text-sm">
      
        < EditIcon className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Editar Perfil</span>
      
      </CaslaButton>
      

      <EditProfileDialog
        user={user}
        isOpen={showDialog}
        onClose={setShowDialog}
      />
    </>
  );
}
