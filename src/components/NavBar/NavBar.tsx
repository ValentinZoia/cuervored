import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SearchField from "./SearchField";
import MenuBar from "./MenuBar";
import { auth } from "@/auth";
import CuervoLogo from "@/components/icons/CuervoLogo";
import { DropdownMenuMyAccount } from "./DropdownMenu";



export default async function NavBar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 bg-blueSanlorenzo text-primary-foreground p-4">
      <div className="container max-w-[1600px] mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold" aria-label="Ir al inicio">
          <CuervoLogo />
        </Link>
        <div className="flex items-center gap-4 list-none">
          <SearchField />
          <MenuBar className="hidden md:flex items-center space-x-5" />
          <DropdownMenuMyAccount sessionProp={session} />
        </div>
      </div>
    </nav>
  );
}
