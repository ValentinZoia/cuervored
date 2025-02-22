import {  Home } from "lucide-react";
import Link from "next/link";
import React from "react";
import Cancha from "@/components/icons/Cancha";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  return (
    <>
      <div className={className}>
        <Link href="/" aria-label="Ir al inicio">
          <Home
            className="h-6 w-6"
            aria-hidden="true" // Atributo ARIA: mejora la accesibilidad
          />
        </Link>

        <Link
          href="/matches"
          aria-label="Ir al historial de partidos"
        >
          <Cancha
            color="white"
            width="24"
            height="24"
            aria-hidden="true" // Atributo ARIA: mejora la accesibilidad
          />
        </Link>
      </div>
    </>
  );
}
