'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { Podcast } from '@/types/podcast';

interface PodcastListItemProps {
    podcast: Podcast;
    index: number;
}

export function PodcastListItem({ podcast, index }: PodcastListItemProps) {
    const t = useTranslations('podcast');
    const animationDelay = index < 8 ? (index % 8) * 0.05 : 0;

    const handlePlayClick = () => {
        if (podcast.trackViewUrl) {
            window.open(podcast.trackViewUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: animationDelay }}
            className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-lg"
        >
            <div className="flex gap-4 p-4">
                {/* Thumbnail */}
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg">
                    <Image
                        src={podcast.artworkUrl600 || podcast.artworkUrl100 || '/placeholder.svg'}
                        alt={podcast.trackName}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Play Button Overlay */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.button
                            onClick={handlePlayClick}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 cursor-pointer"
                            aria-label={t('viewOnItunes')}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="mb-2">
                        <h3 className="line-clamp-2 text-lg font-semibold text-card-foreground">
                            {podcast.trackName}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {t('by')} {podcast.artistName}
                        </p>
                    </div>

                    <p className="mb-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
                        {podcast.collectionName}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(podcast.releaseDate)}
                        </span>
                        {podcast.trackCount > 0 && (
                            <span className="flex items-center gap-1">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                {t('episodes', { count: podcast.trackCount })}
                            </span>
                        )}
                        {podcast.genres && podcast.genres.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {podcast.genres.slice(0, 2).map((genre, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

