"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {  useRef, useEffect, } from "react";
import { useSearch } from '@/hooks/useSearch';
import {SearchResults} from "./SearchResults"

export default function SearchField() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const initialQuery = searchParams.get("q") || "";
  const cardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    debouncedQuery,
    setQuery,
    results,
    isLoading,
    isPending,
    showCard,
    setShowCard,
    queryClient,
  } = useSearch(initialQuery);

  useEffect(() => {
    setQuery(""); // Resetear query si cambia la URL
  }, [pathname, setQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowCard(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      setQuery("");
    };
  }, [setQuery, setShowCard]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowCard(true);
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!debouncedQuery.trim()) return;

    queryClient.invalidateQueries({ queryKey: ["search", debouncedQuery] });
    router.push(`${baseUrl}/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    setQuery("");
  };

  return (
    <div className="relative w-48 md:w-80">
      <form onSubmit={handleSubmit} method="GET" action="/search" role="search">
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
            aria-label="Buscar usuarios"
          />
          <Button
            type="submit"
            className="bg-transparent shadow-none absolute right-0 top-1/2 -translate-y-1/2 sm:size-6 md:size-4 hover:bg-transparent hover:shadow-none"
            aria-label="Buscar"
          >
            <SearchIcon
              className={`absolute right-3 top-1/2 -translate-y-1/2 size-4 transform cursor-pointer ${
                showCard ? "text-redSanlorenzo" : "text-muted-foreground"
              }`}
              aria-hidden="true"
            />
          </Button>
        </div>
      </form>

      {showCard && (
        <Card
          ref={cardRef}
          className="absolute top-full mt-2 w-full z-10 shadow-lg p-0"
          role="dialog"
          aria-label="Resultados de búsqueda"
        >
          <CardHeader className="border-b-[1px]">
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <SearchResults
            results={results}
            isLoading={isLoading}
            isPending={isPending}
            query={query}
            baseUrl={baseUrl}
            handleSubmit={() => handleSubmit()}
          />
        </Card>
      )}
    </div>
  );
}