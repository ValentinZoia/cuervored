"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

export default function ArrowBack() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button variant="ghost" className="rounded-full" onClick={handleBack}>
      <ArrowLeft className="size-5" />
    </Button>
  );
}
