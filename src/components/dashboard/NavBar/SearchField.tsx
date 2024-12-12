"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getAllUsersByUsername } from "@/data/user";
import { set } from "zod";
import UserHeaderPost from "../Post/UserHeaderPost";
import Link from "next/link";
import { CaslaButton } from "@/components/ui/CaslaButton";
import { pages } from "next/dist/build/templates/app-page";
import { UserData } from "@/types/Post";

export default function SearchField() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery); // Para manejar el texto del input
  const [results, setResults] = useState<UserData[]>([]); // Resultados de la búsqueda
  const [showCard, setShowCard] = useState(false); // Para manejar la visibilidad de la card
 
  // Fetch de datos con React Query
  const { data } = useInfiniteQuery({
    queryKey: ["search", query], //<-- La key de la información
    queryFn: ({
      pageParam,
    }: {
      pageParam?: string | number | null | undefined;
      username?: string | null | undefined;
    }) => getAllUsersByUsername({ pageParam, username: query }), //<-- Cómo traer la información
    enabled: !!query.trim(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined, // Define el siguiente parámetro de paginación
  });

  

  React.useEffect(() => {
    if (data) {
      setResults(data.pages.flatMap((page) => page.users) || []);
    }
  }, [data]);

  React.useEffect(() => {
    if (!query) {
      setResults( []);
      setShowCard(false);
    }

    
  }, [query]);


  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowCard(true);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;

    // invalidar manualmente la consulta para actualizar los datos
    queryClient.invalidateQueries({ queryKey: ["search", query] });

    router.push(`/dashboard/search?q=${encodeURIComponent(query.trim())}`);
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
            autoComplete="off"  
            onFocus={() => setShowCard(true)}         
            onBlur={() => setShowCard(false)} // si dejo de hacer focus, ocultar la card
            onChange={handleInputChange}
            className="pe-10 w-48 md:w-80 bg-card text-muted-foreground focus:border-redSanlorenzo focus:border-2"
            style={{ WebkitBackgroundClip: "none" }}
          />
          {/* Botón de búsqueda */}
          <Button
            type="submit"
            className="bg-transparent shadow-none absolute right-0 top-1/2 -translate-y-1/2 sm:size-6 md:size-4 hover:bg-transparent hover:shadow-none"
          >
            <SearchIcon
              className={`absolute right-3 top-1/2 -translate-y-1/2  size-4 transform  cursor-pointer ${
                showCard ? "text-redSanlorenzo" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
      </form>

      {/* Card de resultados */}
      {showCard && (
        <Card className="absolute top-full mt-2 w-full bg-white z-10 shadow-lg p-0">
          <CardHeader className="border-b-[1px]">
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            {results.slice(0, 5).map((user) => (
                <Link href={`users/${user.name}`}>
                  <div
                    key={user.id}
                    className="w-full h-1/2 p-4 hover:bg-secondary border-b-[1px] "
                  >
                    <UserHeaderPost
                      username={user.name}
                      avatarUrl={user.image}
                      linkTo={`users/${user.name}`}
                    />
                  </div>
                </Link>
              )
            
            )
            
            }
            
            {results.length === 0 && <p className="text-center py-4">No se encontraron resultados</p>}
            {results.length > 5 && (
              <CaslaButton variant="redToBlue" className="w-full">Ver Todos</CaslaButton>
            )}
            
          </CardContent>
        </Card>
      )}
    </div>
  );
}
