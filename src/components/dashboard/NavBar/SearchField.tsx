"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsersByUsername } from "@/data/user";
import UserHeaderPost from "../Post/UserHeaderPost";
import Link from "next/link";
import { CaslaButton } from "@/components/ui/CaslaButton";
import { UserData } from "@/types/Post";

export default function SearchField() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery); // Para manejar el texto del input
  const [results, setResults] = useState<UserData[]>([]); // Resultados de la búsqueda
  const [showCard, setShowCard] = useState(false); // Para manejar la visibilidad de la card
  const cardRef = useRef<HTMLDivElement>(null); // Referencia a la card
  const inputRef = useRef<HTMLInputElement>(null); // Referencia al input

  //resetear query(input value) si cambia la URL
  useEffect(() => {
    setQuery(""); // Resetear query si cambia la URL
  }, [pathname]); // Ejecutar este efecto cuando la ruta cambie



  // Fetch de datos con React Query
  const { data, isLoading, isPending } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam }) =>
      getAllUsersByUsername({ pageParam, username: query }),
    enabled: !!query.trim(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });



  // Actualizar los resultados al recibir los datos de la consulta
  useEffect(() => {
    if (data) {
      setResults(data.pages.flatMap((page) => page.users) || []);
    }
  }, [data]);// Ejecutar este efecto cuando la data cambie



  // Limpiar los resultados al borrar el texto
  useEffect(() => {
    if (!query) {
      setResults([]);
      setShowCard(false);
    }
  }, [query]); // Ejecutar este efecto cuando la query cambie



  // Detectar clic fuera de la card y cerrarla
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowCard(false); // Cerrar la card si el clic es fuera de la card y el input
      }
    };

    // Escuchar clics en el documento
    document.addEventListener("click", handleClickOutside);

    // Limpiar el listener al desmontar
    return () => {
      document.removeEventListener("click", handleClickOutside);
      setQuery(""); // Limpiar el input al desmontar
    };
  }, []);



  // Manejar el cambio de texto en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowCard(true);
  };



  // Manejar el envío del formulario y redirrecionar a la página de búsqueda
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;

    // invalidar manualmente la consulta para actualizar los datos
    queryClient.invalidateQueries({ queryKey: ["search", query] });

    router.push(
      `${baseUrl}/dashboard/search?q=${encodeURIComponent(query.trim())}`
    );
    setQuery("");
  }



  return (
    <div className="relative w-48 md:w-80">
      <form onSubmit={handleSubmit} method="GET" action="/search">
        <div className="relative">
          <Input
            ref={inputRef}
            name="q"
            placeholder="Buscar..."
            value={query}
            autoComplete="off"
            onFocus={() => setShowCard(true)}
            onChange={handleInputChange}
            className="pe-10 w-48 md:w-80 bg-card text-muted-foreground focus:border-redSanlorenzo focus:border-2"
            style={{ WebkitBackgroundClip: "none" }}
          />
          <Button
            type="submit"
            className="bg-transparent shadow-none absolute right-0 top-1/2 -translate-y-1/2 sm:size-6 md:size-4 hover:bg-transparent hover:shadow-none"
          >
            <SearchIcon
              className={`absolute right-3 top-1/2 -translate-y-1/2 size-4 transform cursor-pointer ${
                showCard ? "text-redSanlorenzo" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
      </form>

      {/* Card de resultados */}
      {showCard && (
        <Card
          ref={cardRef}
          className="absolute top-full mt-2 w-full z-10 shadow-lg p-0"
        >
          <CardHeader className="border-b-[1px]">
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            {results.slice(0, 5).map((user) => (
              <Link
                key={user.id}
                href={`${baseUrl}/dashboard/users/${user.name}`}
              >
                <div className="w-full h-1/2 p-4 hover:bg-secondary border-b-[1px]">
                  <UserHeaderPost
                    username={user.name}
                    avatarUrl={user.image}
                    linkTo={`${baseUrl}/dashboard/users/${user.name}`}
                  />
                </div>
              </Link>
            ))}
            {results.length === 0 && query.length === 0 && (
              <p className="text-center py-4">Escribe algo...</p>
            )}
            {results.length === 0 &&
              data?.pages.map((page) => page.users.length === 0) &&
              !isLoading &&
              !isPending && (
                <p className="text-center py-4">No se encontraron resultados</p>
              )}
            {isLoading && (
              <div className="w-full py-4 flex justify-center">
                <LoaderCircle className="animate-spin" />
              </div>
            )}
            {results.length > 5 && (
              <CaslaButton
                variant="redToBlue"
                className="w-full"
                onClick={() => handleSubmit}
              >
                Ver Todos
              </CaslaButton>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
