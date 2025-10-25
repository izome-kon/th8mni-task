'use client';

import { motion } from 'framer-motion';

export function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="overflow-hidden rounded-lg border border-border bg-card"
                >
                    {/* Image Skeleton */}
                    <div className="aspect-square w-full bg-muted animate-pulse" />

                    {/* Content Skeleton */}
                    <div className="p-4 space-y-2">
                        {/* Title Skeleton */}
                        <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
                        <div className="h-5 bg-muted rounded w-1/2 animate-pulse" />

                        {/* Artist Skeleton */}
                        <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />

                        {/* Episodes Skeleton */}
                        <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />

                        {/* Genres Skeleton */}
                        <div className="flex gap-1 pt-2">
                            <div className="h-6 bg-muted rounded-full w-16 animate-pulse" />
                            <div className="h-6 bg-muted rounded-full w-20 animate-pulse" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
