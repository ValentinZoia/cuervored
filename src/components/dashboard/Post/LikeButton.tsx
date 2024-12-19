import { LikeInfo } from "@/types/Post";
import { cn } from "@/lib/utils";
import { useLikePostMutation } from "./mutations";
import { Heart } from "lucide-react";
import { useRef } from "react";

interface LikeButtonProps {
  postId: string;
  initialState: LikeInfo;
}
/*
  Función de debounce, que retrasara la funcion para evitar clics repetitivos y
  ocasionar bugs. Esto evita que el servidor reciba multimples solicitudes consecutivas.
*/
function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default function LikeButton({ postId, initialState }: LikeButtonProps) {
  const { data, mutate, isLoading, isPending } = useLikePostMutation({ postId, initialState });

  // Crear una función `debouncedMutate`
  const debouncedMutate = useRef(
    debounce(() => mutate(), 300) // Configura el debounce con un retraso de 300ms
  );

  const isDisabled = isPending || isLoading;

  return (
    <button
  disabled={isDisabled}
  onClick={() => {
    if (!isDisabled) {
      debouncedMutate.current();
    }
  }}
  className={cn(
    " h-8 rounded-md px-3 text-xs relative capitalize inline-flex items-center justify-center whitespace-nowrap  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none overflow-hidden group hover:bg-[#fd170221] hover:fill-redSanlorenzo hover:text-redSanlorenzo",
    isDisabled ? "bg-[#fd170221] fill-redSanlorenzo text-redSanlorenzo" : ""
  )}
>
  <Heart
    className={cn(
      "size-4 mr-2",
      data.isLikedByUser && "fill-redSanlorenzo text-redSanlorenzo"
    )}
  />
  <span className={data.isLikedByUser ? "text-redSanlorenzo " : ""}>
    {data.likes} <span className="hidden sm:inline">Me gusta</span>
  </span>
</button>
  );
}
