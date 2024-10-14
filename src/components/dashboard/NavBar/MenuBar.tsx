import { Bell, Home, MessageSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

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
        <Link href="/dashboard/messages">
          <MessageSquare className="h-6 w-6" />
        </Link>
        <Link href="/dashboard/notifications">
          <Bell className="h-6 w-6" />
        </Link>
      </div>
    </>
  );
}
