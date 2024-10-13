"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon, User } from "lucide-react";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { User as UserType } from "@/types/User";
import Link from "next/link";

interface NewPostProps {
  user: UserType | null;
}

export default function NewPost({ user }: NewPostProps) {
  const fallback = user?.name?.[0] || <User className="h-4 w-4" />
  
  return (
    <Card className="mb-6 bg-card">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Link href="/dashboard/profile">
            <Avatar>
              {user?.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.name || "User avatar"}
                />
              ) : null}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Textarea className='bg-background' placeholder="¿Qué estás pensando sobre el club?" />
            <div className="mt-2 flex justify-between items-center">
              <Button variant="outline" size="sm">
                <ImageIcon className="w-4 h-4 mr-2" />
                Agregar Foto
              </Button>
              <Button size="sm">Publicar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
