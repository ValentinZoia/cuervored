
import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchCard from '@/components/dashboard/Search/SearchCard';
import { auth } from '@/auth';

export default async function SearchPage() {
  const session = await auth();
      if(!session?.user || !session){
          return(
              <p>
                  No estas autorizado para ver esta página.
              </p>
          )
      }

  return (
    <main className='min-h-screen h-fit w-full '>
        <SearchCard />
    </main>
    
  );
}
