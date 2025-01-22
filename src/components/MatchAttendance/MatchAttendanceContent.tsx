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
import { useMatchAttendanceMutation } from "../UpcomingMatches/mutation";
import { getAllUsersByIdToMatchAttendance } from "@/data/user";

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
    enabled: !!matchId.trim(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    gcTime: 1000 * 60 * 5, // 5 minutos
  });

  const users = data?.pages.flatMap((page) => page.users) || [];

  if (isLoading) {
    return <LoadMoreSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (status === "success" && !users.length && !hasNextPage) {
    return <EmptyState text="Aun no hay usuarios anotados" />;
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
