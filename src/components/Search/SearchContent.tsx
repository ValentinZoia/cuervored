"use client";
import { useSearchParams } from "next/navigation";
import React, { memo, Suspense } from "react";
import { UserData } from "@/types/User";
import { useSearch } from "@/hooks/useSearch";
import dynamic from "next/dynamic";
import { LoadMoreSpinner } from "../LoadMoreSpinner";
import { ErrorAlert } from "../ErrorAlert";
import {EmptyState} from "../EmptyState";


// Dynamic imports
const UserCardSearch = dynamic(() => import("./UserCardSearch").then((mod) => mod.UserCardSearch), {
  loading: () => (
    <LoadMoreSpinner />
  ),
  ssr: false,
});

export const InfiniteScrollContainer = dynamic(() => import("../InfiniteScrollContainer"),{ssr:false});


export const MemoizedUser = memo(({ user }: { user: UserData }) => (
  <UserCardSearch user={user}  />
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
    return <EmptyState text="No se encontraron usuarios con ese nombre." />;
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
      {isFetchingNextPage && <LoadMoreSpinner />}
    </InfiniteScrollContainer>
  );
}
