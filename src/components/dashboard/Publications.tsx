import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NewPost from "./NewPost";
import { Post } from "./Post";

export default function Publications() {
  return (
    <>
      <Card className="max-w-[680px] bg-transparent border-none shadow-none lg:col-span-2">
        
        <CardContent>
          <NewPost />
          <div className="space-y-6">
            <Post
              username="Cristian205"
              avatar="/avatar.png"
              timeAgo="hace 1 hora"
              imageUrl="/image.png"
              likes={10}
              content="Hijos de Puta! Mercenarios hijos de puta. Estamos peleando el descenso hermano, nnunca podes patear un penal asi. Me cagaron el fin de semana, pero bue no es novedad eso."
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
