
import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchCard from '@/components/dashboard/Search/SearchCard';
import { auth } from '@/auth';

export default async function SearchPage() {
  const session = await auth();
      if(!session?.user || !session){
          return(
              <p>
                  Unauthorized to view this page
              </p>
          )
      }

  return (
    <main className='h-screen w-full'>
        <SearchCard />
    </main>
    
  );
}
