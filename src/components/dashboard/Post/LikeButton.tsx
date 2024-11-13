import { LikeInfo } from "@/types/Post";
import { cn } from "@/lib/utils";
import { useLikePostMutation } from "./mutations";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  postId: string;
  initialState: LikeInfo;
}

export default function LikeButton({ postId, initialState }: LikeButtonProps) {
  const { data, mutate } = useLikePostMutation({ postId, initialState });
  console.log("LIKENUTTON",data)
  return (
    <Button variant="ghost" size="sm" onClick={() => mutate()} >
      <Heart
        className={cn(
          "size-4 mr-2",
          data.isLikedByUser && "fill-red-500 text-red-500",
        )}
      />
      <span className="">
        {data.likes} <span className="hidden sm:inline">Me gusta</span>
      </span>
    </Button>
  );
}
