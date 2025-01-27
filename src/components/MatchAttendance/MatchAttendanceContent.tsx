"use client";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  MemoizedUser,
 
  InfiniteScrollContainer,
} from "../Search/SearchContent";

import { LoadMoreSpinner } from "../LoadMoreSpinner";
import { ErrorAlert } from "../ErrorAlert";
import { EmptyState } from "../EmptyState";
import { Suspense } from "react";
import { getAllUsersByIdToMatchAttendance } from "@/data/user";
import { notFound } from "next/navigation";

export default function MatchAttendanceContent({
  matchId,
}: {
  matchId: string;
}) {

 
  //obtener todos los usuarios
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    status,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["match-attendance", matchId],
    queryFn: ({ pageParam }) =>
      getAllUsersByIdToMatchAttendance({
        pageParam,
        matchId: matchId,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!matchId.trim(),
  });

  const users = data?.pages.flatMap((page) => page.users) || [];

  if (isLoading) {
    return <div className="bg-card"><LoadMoreSpinner /></div> ;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (status === "success" && !users.length && !hasNextPage) {
    return <div className="w-full bg-card border-x-[1px] border-b-[1px]   h-auto flex flex-col items-stretch text-center"><EmptyState text="Aun no hay usuarios anotados" /></div>;
  }

  return (
    <InfiniteScrollContainer
      className="relative z-10 space-1-2"
      onBottomReached={() => hasNextPage && !isLoading && fetchNextPage()}
    >
      <div className="w-full bg-card border-x-[1px] border-b-[1px]   h-auto flex flex-col items-stretch">
        <h2 className="px-4 py-2 text-bold">Usuarios:</h2>
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
