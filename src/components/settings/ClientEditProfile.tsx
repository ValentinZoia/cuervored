"use client";

import { UserData } from "@/types/Post"
import EditProfileForm from "../users/EditProfile/EditProfileForm"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ClientEditProfile({user}:{user:UserData}) {
  return (
    <Card className="">
        <CardHeader>
            <CardTitle>Editar perfil</CardTitle>
        </CardHeader>
        
        <CardContent>
           <EditProfileForm user={user} onClose={()=>{}} /> 
        </CardContent>
        
    </Card>
    
  )
}
