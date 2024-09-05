
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
// import { signOut} from "next-auth/react";

import { useSession } from "next-auth/react"
import { DefaultSession } from "next-auth";
import { Session } from "next-auth";
import { signOut } from "@/auth"
 
  
  interface DropdownMenuMyAccountProps {
    sessionProp: Session | DefaultSession | null;
    
  }


export async function DropdownMenuMyAccount({sessionProp}: DropdownMenuMyAccountProps) {
    const session = sessionProp;
    

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer">
            <PersonIcon />
            <span className="ml-2">My Account</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center  gap-2">
        {session?.user?.image ?(
                <img
                src={session?.user?.image}
                alt={`${session?.user?.name}'s avatar`}
                className="w-8 h-8 rounded-full " 
              />
            ):(
                <div className="w-8 h-8 rounded-full bg-slate-300 pr-8 "></div>
            )}
            <p className="text-sm overflow-hidden">{session?.user?.name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
        <DropdownMenuItem> 
            <p className="text-slate-400">{session?.user?.email}</p>
        </DropdownMenuItem>

          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <form action={async () => {"use server"; await signOut()}}>
            <button className="text-red-500 inline-flex items-center gap-2 font-bold">Log out <ExitIcon /></button>
            </form>
          
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
