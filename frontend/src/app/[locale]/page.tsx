'use client';

import { useTranslations } from 'next-intl';
import { SearchBar } from '@/components/search/SearchBar';
import { PodcastGrid } from '@/components/podcast/PodcastGrid';
import { ViewToggle } from '@/components/podcast/ViewToggle';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { BackToTop } from '@/components/common/BackToTop';
import { EmptySearchState } from '@/components/common/EmptySearchState';
import { NoResultsState } from '@/components/common/NoResultsState';
import { LoadingMoreIndicator } from '@/components/common/LoadingMoreIndicator';
import { usePodcastSearch } from '@/hooks/usePodcastSearch';
import { useViewMode } from '@/hooks/useViewMode';

export default function HomePage() {
  const t = useTranslations();

  const {
    searchQuery,
    handleSearch,
    allPodcasts,
    totalResults,
    isLoading,
    isError,
    error,
    refetch,
    isFetchingNextPage,
    hasNextPage,
    observerTarget,
    hasSearchQuery,
    hasResults,
    showResults,
  } = usePodcastSearch();

  const { viewMode, setViewMode } = useViewMode();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border bg-linear-to-b from-background to-accent/10">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-card-foreground sm:text-5xl md:text-6xl">
              {t('header.title')}
              <br />
              {t('header.title2')}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              {t('header.subtitle')}
            </p>
            <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-8">
        {/* Results Header: Count and View Toggle */}
        {showResults && (
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-muted-foreground">
              {t('results.resultsCount', { count: totalResults })}
            </p>
            <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Error State */}
        {isError && (
          <ErrorMessage
            message={error instanceof Error ? error.message : t('errors.generic')}
            onRetry={() => refetch()}
          />
        )}

        {/* Empty State: No Search Query */}
        {!hasSearchQuery && !isLoading && (
          <EmptySearchState
            title={t('common.searchPlaceholder')}
            description={t('header.subtitle')}
          />
        )}

        {/* Empty State: No Results Found */}
        {hasSearchQuery && !hasResults && !isLoading && !isError && (
          <NoResultsState
            title={t('results.noResults')}
            description={t('results.noResultsDescription')}
          />
        )}

        {/* Results Grid */}
        {showResults && (
          <>
            <PodcastGrid podcasts={allPodcasts} viewMode={viewMode} />

            {/* Infinite Scroll Trigger & Status */}
            <div ref={observerTarget} className="mt-8 flex justify-center">
              {isFetchingNextPage && <LoadingMoreIndicator text={t('common.loading')} />}
              {!hasNextPage && hasResults && (
                <p className="text-sm text-muted-foreground">
                  {t('results.allLoaded')}
                </p>
              )}
            </div>
          </>
        )}
      </section>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}
