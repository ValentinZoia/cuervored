"use client";
import { Button } from "@/components/ui/button";
import { FollowerInfo } from "@/types/Post";
import React from "react";
import { useFollowerUserMutation } from "./mutation";
import { useRef } from "react";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
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

//componente
export default function FollowButton({
  userId,
  initialState,
  size,
}: FollowButtonProps) {
  const { data, mutate, isLoading, isPending } = useFollowerUserMutation({
    userId,
    initialState,
  });

  const [isHovering, setIsHovering] = React.useState(false);
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [width, setWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (spanRef.current) {
      setWidth(spanRef.current.offsetWidth);
    }
  }, [data.isFollowedByUser, isHovering]);

  // Crear una función `debouncedMutate`
  const debouncedMutate = useRef(
    debounce(() => mutate(), 300) // Configura el debounce con un retraso de 300ms
  );

  /*
  Desablitar boton cuando:
  - isPending: Cuando la solicitud de seguimiento (follow) está en proceso
  - isLoading: Cuando la data esta cargando
  */ 
  const isDisabled = isPending || isLoading;
  
  return (
    <Button
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={isDisabled}
      variant="default"
      size={size ? size : "default"}
      className={` ${size === "sm" ? "text-xs" : "text-sm"} ${
        data.isFollowedByUser &&
        "hover:text-redSanlorenzo hover:bg-[#fd170257] hover:border-redSanlorenzo border-[1px] "
      } `}
      onClick={() => {
        if (!isDisabled) {
          debouncedMutate.current();
        }
      }}
    >
      {data.isFollowedByUser && (
        <span className="opacity-0 pointer-events-none absolute" ref={spanRef}>
          Dejar de Seguir
        </span>
      )}

      <span
        className={`visible`}
        style={{ width: data.isFollowedByUser ?   width ? `${width}px` : undefined : undefined }}
      >
        {data.isFollowedByUser
          ? isHovering
            ? "Dejar de seguir"
            : "Siguiendo"
          : "Seguir"}
      </span>
    </Button>
  );
}
