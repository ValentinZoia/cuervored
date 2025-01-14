"use client";
import { useSearchParams } from "next/navigation";
import React, { memo, Suspense } from "react";
import { UserData } from "@/types/Post";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import { Loader } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import dynamic from "next/dynamic";
const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

// Dynamic imports
const UserCardSearch = dynamic(() => import("./UserCardSearch").then((mod) => mod.UserCardSearch), {
  loading: () => (
    <div
      role="status"
      aria-label="Cargando comentarios"
      className="flex justify-center p-4"
    >
      <Loader className="animate-spin" aria-hidden="true" />
    </div>
  ),
});

// Componentes memoizados para mejor rendimiento
const ErrorAlert = memo(({ error }: { error: Error | unknown }) => (
  <>
    <p>Error: {error instanceof Error ? error.message : "Unexpected error"}</p>
  </>
));
ErrorAlert.displayName = "ErrorAlert";

const EmptyState = memo(() => (
  <p className="text-center mt-4">No se encontraron usuarios con ese nombre.</p>
));
EmptyState.displayName = "EmptyState";

const LoadMoreSpinner = memo(() => (
  <div className="w-full flex justify-center py-4">
    <Loader className="animate-spin" />
  </div>
));
LoadMoreSpinner.displayName = "LoadMoreSpinner";

const MemoizedUser = memo(({ user }: { user: UserData }) => (
  <UserCardSearch user={user} baseUrl={baseUrl} />
));
MemoizedUser.displayName = "MemoizedUser";




export default function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");

 
  const {
    isLoading,
    error,
    results: users,
    hasNextPage,
    status,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearch(initialQuery || "");

  if (!initialQuery) {
    return <p>No se encontraron resultados</p>;
  }

  if (isLoading) {
    return <LoadMoreSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (status === "success" && !users.length && !hasNextPage) {
    return <EmptyState />;
  }

  return (
    <InfiniteScrollContainer
      className="relative z-10 space-1-2"
      onBottomReached={() => hasNextPage && !isLoading && fetchNextPage()}
    >
      <div className="w-full bg-card border-x-[1px] border-b-[1px]   h-auto flex flex-col items-stretch">
        <Suspense fallback={<LoadMoreSpinner />}>
          {users.map((user) => (
            <MemoizedUser key={user.id} user={user} />
          ))}
        </Suspense>
      </div>
      {isFetchingNextPage && <Loader className="mx-auto animate-spin" />}
    </InfiniteScrollContainer>
  );
}
