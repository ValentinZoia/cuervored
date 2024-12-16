import { Bell, Home, MessageSquare } from "lucide-react";
import {} from "@radix-ui/react-icons"
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
        <Link href="/dashboard">
          <Home className="h-6 w-6" />
        </Link>
        
        <Link href="/dashboard/matches">
          
          
          <Cancha color="white" width="24" height="24" />
        </Link>
      </div>
    </>
  );
}
