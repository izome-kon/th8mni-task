'use client';

import { Podcast } from '@/types/podcast';
import { PodcastCard } from './PodcastCard';
import { PodcastListItem } from './PodcastListItem';
import type { ViewMode } from './ViewToggle';

interface PodcastGridProps {
    podcasts: Podcast[];
    viewMode?: ViewMode;
}

export function PodcastGrid({ podcasts, viewMode = 'grid' }: PodcastGridProps) {
    if (podcasts.length === 0) {
        return null;
    }

    // Grid View
    if (viewMode === 'grid') {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {podcasts.map((podcast, index) => (
                    <PodcastCard key={podcast.collectionId} podcast={podcast} index={index} />
                ))}
            </div>
        );
    }


    return (
        <div className="flex flex-col gap-4">
            {podcasts.map((podcast, index) => (
                <PodcastListItem key={podcast.collectionId} podcast={podcast} index={index} />
            ))}
        </div>
    );
}

