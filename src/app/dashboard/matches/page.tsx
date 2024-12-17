import { auth } from '@/auth';
import React from 'react'


export default async function MatchesPage() {
  const session = await auth();
      if(!session?.user || !session){
          return(
              <p>
                  Unauthorized to view this page
              </p>
          )
      }
  
  
    return (
    <div>Hola Querido</div>
  )
}
