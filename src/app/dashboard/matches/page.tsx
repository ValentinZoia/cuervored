import { auth } from '@/auth';
import AllMatches from '@/components/dashboard/Matches/AllMatches';


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
    
    <main className='min-h-screen h-fit w-full col-span-2'>
      <AllMatches/>
    </main>
    
  )
}
