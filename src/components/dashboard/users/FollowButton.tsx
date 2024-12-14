"use client";
import { Button } from "@/components/ui/button";
import { FollowerInfo } from "@/types/Post";
import React from "react";
import { useFollowerUserMutation } from "./mutation";
import { useRef } from "react";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
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

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const { data, mutate, isLoading, isPending } = useFollowerUserMutation({
    userId,
    initialState,
  });

  // Crear una función `debouncedMutate`
  const debouncedMutate = useRef(
    debounce(() => mutate(), 300) // Configura el debounce con un retraso de 300ms
  );

  const isDisabled = isPending || isLoading;
  return (
    <Button
      disabled={isDisabled}
      variant="default"
      className="text-sm"
      onClick={() => {
        if (!isDisabled) {
          debouncedMutate.current();
        }
      }}
    >
      {data.isFollowedByUser ? "Siguiendo" : "Seguir"}
    </Button>
  );
}
