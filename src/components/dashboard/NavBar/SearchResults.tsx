import { CardContent } from "@/components/ui/card";
import { CaslaButton } from "@/components/ui/CaslaButton";
import { UserData } from "@/types/Post";
import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { memo } from "react";


const UserCardSearch = dynamic(() => import("../Search/UserCardSearch").then((mod) => mod.UserCardSearch), {
  
  
});

export const SearchResults = memo(({ 
    results, 
    isLoading, 
    isPending, 
    query, 
    baseUrl,
    handleSubmit 
  }: {
    results: UserData[];
    isLoading: boolean;
    isPending: boolean;
    query: string;
    baseUrl: string;
    handleSubmit: () => void;
  }) => (
    <CardContent className="px-0">
      {results.slice(0, 5).map((user) => (
        <UserCardSearch key={user.id} user={user} baseUrl={baseUrl} />
      ))}
      {results.length === 0 && query.length === 0 && (
        <p className="text-center py-4" role="status">Escribe algo...</p>
      )}
      {results.length === 0 && !isLoading && !isPending && query.length > 0 && (
        <p className="text-center py-4" role="status">No se encontraron resultados</p>
      )}
      {isLoading  && (
        <div className="w-full py-4 flex justify-center" role="status" aria-label="Cargando resultados">
          <LoaderCircle className="animate-spin" aria-hidden="true" />
        </div>
      )}
      {results.length > 5 && (
        <CaslaButton
          variant="redToBlue"
          className="w-full"
          onClick={handleSubmit}
          aria-label="Ver todos los resultados"
        >
          Ver Todos
        </CaslaButton>
      )}
    </CardContent>
  ));
  SearchResults.displayName = 'SearchResults';