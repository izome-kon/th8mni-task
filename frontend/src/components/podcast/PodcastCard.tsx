'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Podcast } from '@/types/podcast';

interface PodcastCardProps {
    podcast: Podcast;
    index?: number;
}

export function PodcastCard({ podcast, index = 0 }: PodcastCardProps) {
    const t = useTranslations('podcast');

    const handlePlayClick = () => {
        if (podcast.trackViewUrl) {
            window.open(podcast.trackViewUrl, '_blank', 'noopener,noreferrer');
        }
    };

    // Delay only for first 8 cards, after that no delay
    const animationDelay = index < 8 ? (index % 8) * 0.05 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.3,
                delay: animationDelay,
                ease: "easeOut"
            }}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-2xl"
        >
            {/* Artwork */}
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative h-full w-full"
                >
                    <Image
                        src={podcast.artworkUrl600 || podcast.artworkUrl100 || '/placeholder.svg'}
                        alt={podcast.trackName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </motion.div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/50">
                    <motion.button
                        onClick={handlePlayClick}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
                        aria-label={t('viewOnItunes')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-7 w-7 ms-0.5"
                        >
                            <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                {/* Title */}
                <h3 className="line-clamp-2 text-base font-semibold text-card-foreground">
                    {podcast.trackName}
                </h3>

                {/* Artist */}
                <p className="text-sm text-muted-foreground">
                    {t('by')} {podcast.artistName}
                </p>

                {/* Episodes Count */}
                {podcast.trackCount > 0 && (
                    <p className="text-xs text-muted-foreground">
                        {t('episodes', { count: podcast.trackCount })}
                    </p>
                )}

                {/* Genres */}
                {podcast.genres && podcast.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2">
                        {podcast.genres.slice(0, 2).map((genre, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground transition-transform cursor-default"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
