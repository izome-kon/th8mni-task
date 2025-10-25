'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading?: boolean;
    initialValue?: string;
    debounceDelay?: number;
}

export function SearchBar({
    onSearch,
    isLoading,
    initialValue = '',
    debounceDelay = 300
}: SearchBarProps) {
    const t = useTranslations('common');
    const [query, setQuery] = useState(initialValue);

    // Debounce the search query
    const debouncedQuery = useDebounce(query, debounceDelay);

    // Sync with external value changes (e.g., from URL)
    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    // Trigger search when debounced value changes
    useEffect(() => {
        if (debouncedQuery.trim()) {
            onSearch(debouncedQuery);
        }
    }, [debouncedQuery, onSearch]);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (query.trim()) {
                onSearch(query);
            }
        },
        [query, onSearch]
    );

    return (
        <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="w-full"
        >
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
                    <svg
                        className="h-5 w-5 text-muted-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full rounded-lg border border-input bg-background py-4 ps-12 pe-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={t('searchPlaceholder')}
                    disabled={isLoading}
                />
                {isLoading && (
                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-4">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                )}
            </div>
        </motion.form>
    );
}
