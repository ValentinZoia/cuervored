
import React from 'react';

import SearchCard from '@/components/Search/SearchCard';
import { auth } from '@/auth';
import { Metadata} from 'next';

type Props ={
    
    searchParams: Promise<{q:string}>
}

//Definimos la metadata dinamica de la página
// a partir de los parametros de busqueda search?q="query"
export async function generateMetadata({ searchParams }:Props):Promise<Metadata> {
    const query = (await searchParams).q;
    
    
    return {
      title: `${query} - Buscar`,
      description: `Busca a tus amigos en CuervoRed, buscando a ${query}`,
    }
  }




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
