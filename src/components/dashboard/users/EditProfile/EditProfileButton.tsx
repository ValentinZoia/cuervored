"use client";
import { Button } from "@/components/ui/button";
import { UserData } from "@/types/Post";
import React, { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";

interface EditProfileButtonProps {
  user: UserData;
}

export default function EditProfileButton({ user }: EditProfileButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
    <Button
      variant="default"
      className="text-sm"
      onClick={() => setShowDialog(true)}
    >
      Edit Profile
    </Button>

    <EditProfileDialog user={user} isOpen={showDialog} onClose={setShowDialog} />
    </>
    
  );
}
