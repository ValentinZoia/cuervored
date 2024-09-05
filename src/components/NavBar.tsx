
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

import { DropdownMenuMyAccount } from "./DropdownMenu";
import { auth } from "@/auth";


export default async function NavBar() {
   //useSession = nos permite saber si estamos autenticados o no
  //  const { data: session } = useSession();
  const session = await auth();
  return (
    <>
      <nav className="flex justify-around items-center py-4 bg-[#141414] text-white">
        <Link href="/" className="text-xl font-bold">
          LOGO
        </Link>

        <ul className="hidden md:flex items-center gap-4 list-none">
          
            
            <>
              <DropdownMenuMyAccount  sessionProp={session}/>
              
            </>
          
        </ul>
      </nav>
    </>
  );
}
