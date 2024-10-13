import React from 'react'
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import NewPostClient from './NewPostClient';



export default async  function NewPost() {
    const session = await auth();
    const user = await getUserById(session?.user?.id as string);
  
    return (
    <>
    <NewPostClient user={user}/>
    </>
  )
}
