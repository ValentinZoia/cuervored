"use client";

import { UserData } from "@/types/User";
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
     

      <CaslaButton aria-label="Editar Perfil" variant="blueToRed" onClick={() => setShowDialog(true)} className="text-sm">
      
        < EditIcon className=" sm:mr-2 h-4 w-4" />
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
