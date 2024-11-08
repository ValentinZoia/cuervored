"use client"
import Link from "next/link";
import React from "react";
import { DropdownMenuMyAccount } from "./DropdownMenu";
import SearchField from "./SearchField";
import MenuBar from "./MenuBar";
import { useSession } from "next-auth/react";

export default  function NavBar() {
  
  // const session = await auth();
  const {data:session} = useSession();
  return (
    <>
      

      <nav className=" sticky top-0 z-50 bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold">
            LOGO
          </Link>
          <div className="flex items-center gap-4 list-none">
            {/* <Input
              type="search"
              placeholder="Search..."
              className="hidden md:block w-64 bg-card text-foreground"
              style={{ WebkitBackgroundClip: "none" }}
            />
            <SearchIcon className="md:hidden lg:hidden h-6 w-6" /> */}

              <SearchField />

              <MenuBar className="hidden md:flex items-center space-x-5" />
              
            <DropdownMenuMyAccount sessionProp={session} />
          </div>
        </div>
      </nav>
    </>
  );
}
