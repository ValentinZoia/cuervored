
import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchCard from '@/components/dashboard/Search/SearchCard';

export default function SearchPage() {
  

  return (
    <main className='h-screen w-full'>
        <SearchCard />
    </main>
    
  );
}
