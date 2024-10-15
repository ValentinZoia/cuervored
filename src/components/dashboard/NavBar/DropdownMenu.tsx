
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"




import { DefaultSession } from "next-auth";
import { Session } from "next-auth";
import { signOut } from "@/auth"
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { getUserById } from "@/data/user";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
 
  
  interface DropdownMenuMyAccountProps {
    sessionProp: Session | DefaultSession | null;
    
  }

  

export async function DropdownMenuMyAccount({sessionProp}: DropdownMenuMyAccountProps) {
    const session = sessionProp;
    const user = await getUserById(session?.user?.id as string);
    const fallback = user?.name?.[0] || <User className="h-4 w-4" />
    
    

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        
        <Avatar className="text-black cursor-pointer">
              {user?.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.name || "User avatar"}
                />
              ) : null}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            
        
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center  gap-2">
        <Avatar className="h-8 w-8">
              {user?.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.name || "User avatar"}
                />
              ) : null}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <p className="text-sm overflow-hidden">{user?.name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
        <DropdownMenuItem> 
            <p className="text-slate-400">{user?.email}</p>
        </DropdownMenuItem>

          <DropdownMenuItem asChild>
            
            <Link href="/dashboard/profile" className="w-full cursor-pointer">
            <User className="mr-2 w-4 h-4" />
            <span>Profile</span>
            </Link>
            
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            
            <Link href="/dashboard/settings" className="w-full cursor-pointer">
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
