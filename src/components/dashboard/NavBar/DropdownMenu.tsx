
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
import { PersonIcon } from "@radix-ui/react-icons";
// import { signOut} from "next-auth/react";


import { DefaultSession } from "next-auth";
import { Session } from "next-auth";
import { signOut } from "@/auth"
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { getUserById } from "@/data/user";
 
  
  interface DropdownMenuMyAccountProps {
    sessionProp: Session | DefaultSession | null;
    
  }

  

export async function DropdownMenuMyAccount({sessionProp}: DropdownMenuMyAccountProps) {
    const session = sessionProp;
    const user = await getUserById(session?.user?.id as string);
    
    
    

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
        {user?.image ?(
                <img
                src={user?.image}
                alt={`${user?.name}'s avatar`}
                className="w-8 h-8 rounded-full " 
              />
            ):(
                <div className="w-8 h-8 rounded-full bg-slate-300 pr-8 "></div>
            )}
            <p className="text-sm overflow-hidden">{user?.name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
        <DropdownMenuItem> 
            <p className="text-slate-400">{user?.email}</p>
        </DropdownMenuItem>

          <DropdownMenuItem asChild>
            
            <Link href="/dashboard/profile" className="w-full">
            <User className="mr-2 w-4 h-4" />
            <span>Profile</span>
            </Link>
            
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            
            <Link href="/dashboard/settings" className="w-full">
            <Settings className="mr-2 w-4 h-4" />
            <span>Settings</span>
            </Link>
            
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <form action={async () => {"use server"; await signOut()}}>
            <button className="text-red-500 inline-flex items-center gap-2 font-bold"> <LogOut className="w-5 h-5"/> Log out</button>
            </form>
          
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
