import { auth } from '@/auth';
import AllMatches from '@/components/Matches/AllMatches';
import { Metadata } from 'next';


import React from 'react'

export const metadata:Metadata={
  title:"Historial de Partidos",
  description:"Mira el historial de partidos y disfruta de una simple red social para hinchas de San lorenzo."
}

export default async function MatchesPage() {
  const session = await auth();
      if(!session?.user || !session){
          return(
              <p>
                  No estas autorizado para ver esta página.
              </p>
          )
      }
  
  
    return (
    
    <main className='min-h-screen h-fit w-full col-span-2'>
      <AllMatches/>
    </main>
    
  )
}
