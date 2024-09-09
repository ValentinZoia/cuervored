"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { useState } from "react";

interface DialogDeleteAccountProps {
  removeAccount: () => void;
}

export default function DailogDeleteAccount({
  removeAccount,
}: DialogDeleteAccountProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [confirmText, setConfirmText] = useState<string>('');

    const handleDelete = ()=>{
        if(confirmText == "DELETE"){
            removeAccount();
            setIsOpen(false);
        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all of your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            Before proceeding, please consider:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>All your personal information will be erased</li>
            <li>You will lose access to all your saved content and preferences</li>
            <li>Any subscriptions or services tied to this account will be cancelled</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            If you're having issues with your account, please contact our support team
            as they may be able to help without deleting your account.
          </p>
          <div className="grid gap-2">
            <Label htmlFor="delete-confirm" className="text-sm">
              Type DELETE to confirm
            </Label>
            <Input
              id="delete-confirm"
              
              onChange={(e) => setConfirmText(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={confirmText !== "DELETE"}>
              Delete Account
            </Button>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
