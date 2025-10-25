import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { searchPodcasts } from '@/lib/api';
import type { Podcast } from '@/types/podcast';

// Constants
const RESULTS_PER_PAGE = 20;
const QUERY_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const QUERY_RETRY_COUNT = 2;
const INTERSECTION_THRESHOLD = 0.1;

interface UsePodcastSearchOptions {
    resultsPerPage?: number;
    staleTime?: number;
    retryCount?: number;
    intersectionThreshold?: number;
}

export function usePodcastSearch(options: UsePodcastSearchOptions = {}) {
    const {
        resultsPerPage = RESULTS_PER_PAGE,
        staleTime = QUERY_STALE_TIME,
        retryCount = QUERY_RETRY_COUNT,
        intersectionThreshold = INTERSECTION_THRESHOLD,
    } = options;

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // State management
    const initialQuery = useMemo(() => searchParams.get('q') || '', [searchParams]);
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    // Refs
    const observerTarget = useRef<HTMLDivElement>(null);

    // Sync search query from URL parameters
    useEffect(() => {
        const query = searchParams.get('q') || '';
        setSearchQuery(query);
    }, [searchParams]);

    // Infinite query for paginated podcast search
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['podcasts', searchQuery],
        queryFn: ({ pageParam = 1 }) =>
            searchPodcasts({ q: searchQuery, page: pageParam, limit: resultsPerPage }),
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.data.pagination;
            return page < totalPages ? page + 1 : undefined;
        },
        enabled: searchQuery.length > 0,
        staleTime,
        retry: retryCount,
        initialPageParam: 1,
    });

    // Handle search with URL synchronization
    const handleSearch = useCallback(
        (query: string) => {
            setSearchQuery(query);

            // Update URL search params without page reload
            const params = new URLSearchParams();
            if (query.trim()) {
                params.set('q', query);
                router.push(`${pathname}?${params.toString()}`, { scroll: false });
            } else {
                router.push(pathname, { scroll: false });
            }
        },
        [router, pathname]
    );

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: intersectionThreshold }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, intersectionThreshold]);

    // Memoized computed values
    const allPodcasts = useMemo<Podcast[]>(
        () => data?.pages.flatMap((page) => page.data.results) || [],
        [data]
    );

    const totalResults = useMemo(
        () => data?.pages[0]?.data.pagination.total || 0,
        [data]
    );

    const hasSearchQuery = searchQuery.trim().length > 0;
    const hasResults = allPodcasts.length > 0;
    const showResults = hasSearchQuery && hasResults && !isLoading;

    return {
        // Search state
        searchQuery,
        handleSearch,

        // Query state
        allPodcasts,
        totalResults,
        isLoading,
        isError,
        error,
        refetch,

        // Infinite scroll state
        hasNextPage,
        isFetchingNextPage,
        observerTarget,

        // Computed flags
        hasSearchQuery,
        hasResults,
        showResults,
    };
}
