"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SearchField() {
  const router = useRouter();
  const [query, setQuery] = useState(""); // Para manejar el texto del input
  const [results, setResults] = useState<string[]>([]); // Resultados de la búsqueda
  const [showCard, setShowCard] = useState(false); // Para manejar la visibilidad de la card
  

  // Simula una solicitud de búsqueda (puedes reemplazar esto con una API real)
  const fetchResults = (searchQuery: string) => {
    const mockResults = ["Resultado 1", "Resultado 2", "Resultado 3"].filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(mockResults);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
     
    fetchResults(value); // Actualiza los resultados
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="relative w-48 md:w-80">
      <form onSubmit={handleSubmit} method="GET" action="/search">
        <div className="relative">
          {/* Input de búsqueda */}
          <Input
            name="q"
            placeholder="Search..."
            value={query}
            autoComplete='off'
            onFocus={() => setShowCard(true)}
            onBlur={() => setShowCard(false)}
            
            onChange={handleInputChange}
            className="pe-10 w-48 md:w-80 bg-card text-muted-foreground focus:border-redSanlorenzo focus:border-2"
            style={{ WebkitBackgroundClip: "none" }}
          />
          {/* Botón de búsqueda */}
          <Button
            type="submit"
            className="bg-transparent shadow-none absolute right-0 top-1/2 -translate-y-1/2 sm:size-6 md:size-4 hover:bg-transparent hover:shadow-none"
          >
            <SearchIcon className={`absolute right-3 top-1/2 -translate-y-1/2  size-4 transform  cursor-pointer ${showCard ? "text-redSanlorenzo" : "text-muted-foreground"}`} />
          </Button>
        </div>
      </form>

      {/* Card de resultados */}
      {showCard && (
        <Card className="absolute top-full mt-2 w-full bg-white z-10 shadow-lg">
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <ul>
                {results.map((result, index) => (
                  <li key={index} className="py-1">
                    {result}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Sin resultados.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}