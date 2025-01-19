"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DefaultSession } from "next-auth";
import { Session } from "next-auth";
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { ModeToggle } from "@/components/ui/theme-toggle";
import UserAvatar from "../Post/UserAvatar";

interface DropdownMenuMyAccountProps {
  sessionProp: Session | DefaultSession | null;
}

export function DropdownMenuMyAccount({
  sessionProp,
}: DropdownMenuMyAccountProps) {
  const queryClient = useQueryClient();

  const user = sessionProp?.user;

  const fallback = user?.name?.[0] || <User className="h-4 w-4" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="border-0 bg-transparent p-0"
          aria-label="Abrir menú de perfil" // Atributo ARIA: mejora la accesibilidad
        >
          <UserAvatar avatarUrl={user?.image} username={user?.name} imageType="profileSmall" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center  gap-2">
        <UserAvatar avatarUrl={user?.image} username={user?.name} imageType="profileSmall" />
          <p className="text-sm overflow-hidden">{user?.name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <p className="text-slate-400">{user?.email}</p>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={`/${user?.name}`}
              className="w-full cursor-pointer"
              aria-label="Ver perfil de usuario"
            >
              <User className="mr-2 w-4 h-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              className="w-full cursor-pointer"
              aria-label="Ir a la configuración"
            >
              <Settings className="mr-2 w-4 h-4" />
              <span>Configuración</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <ModeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signOut();
              queryClient.clear();
            }}
          >
            <button
              className="text-red-500 inline-flex items-center gap-2 font-bold"
              aria-label="Cerrar sesión"
            >
              {" "}
              <LogOut className="w-5 h-5" aria-hidden="true" /> Cerrar Sesión
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
