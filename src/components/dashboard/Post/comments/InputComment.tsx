import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostData } from "@/types/Post";
import { SendHorizonal, Smile } from "lucide-react";
import React, { forwardRef, useRef, useState } from "react";
import { useSubmitCommentMutation } from "./mutation";

interface InputCommentProps {
  post: PostData;
}

const InputComment = forwardRef<HTMLInputElement, InputCommentProps>(
  ({ post }, ref) => {
    const [input, setInput] = useState("");
    const mutation = useSubmitCommentMutation(post.id);


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!input) return;

      
      
          mutation.mutate(
              {
                  post,
                  comment: input
              },
              {
                  onSuccess: () => setInput(""),
              },
          );
          
      
    };

    return (
      <>
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-2"
        >
          <Input
            placeholder="Agregar un comentario..."
            className="flex-1"
            ref={ref}
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
);

InputComment.displayName = "InputComment";

export default InputComment;
