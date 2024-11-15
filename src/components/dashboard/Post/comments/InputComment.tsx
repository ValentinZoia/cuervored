import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostData } from "@/types/Post";
import { SendHorizonal, Smile } from "lucide-react";
import React, { useState } from "react";

interface InputCommentProps {
    post: PostData;
}

export default function InputComment({post}: InputCommentProps) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!input) return;

    {/*
    
        mutation.mutate(
            {
                post,
                content:input,
            },
            {
                onSuccess: () => setInput(""),
            },
        );
        
    */}
  }

    
  



  return (
    <>
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
    <Input
        placeholder="Agregar un comentario..."
        className="flex-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button size="sm" variant="ghost" disabled={!input.trim()}>
        <SendHorizonal className="h-4 w-4" />
      </Button>

    </form>
      
    </>
  );
}
