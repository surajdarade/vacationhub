import React, { FC } from "react";
import { Listing } from "@prisma/client";
import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";

import ListingCard, { ListingSkeleton } from "./ListingCard";
import { useLoadMore } from "@/hooks/useLoadMore";

interface LoadMoreProps {
  nextCursor: string;
  fnArgs?: Record<string, string | undefined>;
  queryFn: (args: Record<string, string | undefined>) => Promise<{
    listings: Listing[];
    nextCursor: string | null;
  }>;
  queryKey: any[];
  favorites: string[];
}

const LoadMore: FC<LoadMoreProps> = ({
  nextCursor,
  fnArgs,
  queryFn,
  queryKey,
  favorites,
}) => {
  const { data, isFetchingNextPage, hasNextPage, status, fetchNextPage } =
    useInfiniteQuery<unknown, Error, { listings: Listing[] }, any[]>({
      queryFn: ({ pageParam }) => queryFn({ ...fnArgs, cursor: pageParam as string }),
      queryKey,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: nextCursor,
    });

  const { ref } = useLoadMore(
    fetchNextPage,
    hasNextPage,
    status === "loading" || isFetchingNextPage,
    status === "error"
  );

  return (
    <>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group?.listings?.map((listing) => {
            const hasFavorited = favorites.includes(listing.id);
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                hasFavorited={hasFavorited}
                reservation={listing.reservation}
              />
            );
          })}
        </React.Fragment>
      ))}
      {(status === "loading" || isFetchingNextPage) && (
        <>
          {Array.from({ length: 4 }).map((_item, i) => (
            <ListingSkeleton key={i} />
          ))}
        </>
      )}
      {status === "error" && (
        <p className="text-xl mt-8 text-center font-semibold">
          Something went wrong!
        </p>
      )}
      {["error", "pending", "success"].includes(status) && (
        <div ref={ref} />
      )}
    </>
  );
};

export default LoadMore;
