'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export type ViewMode = 'grid' | 'list' | 'compact';

interface ViewToggleProps {
    currentView: ViewMode;
    onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
    const t = useTranslations('common');

    const views: { mode: ViewMode; icon: React.ReactElement; label: string }[] = [
        {
            mode: 'grid',
            label: t('viewGrid'),
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            ),
        },
        {
            mode: 'list',
            label: t('viewList'),
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            ),
        },
    ];

    return (
        <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
            {views.map((view) => (
                <motion.button
                    key={view.mode}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onViewChange(view.mode)}
                    className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${currentView === view.mode
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                    aria-label={view.label}
                    title={view.label}
                >
                    {view.icon}
                </motion.button>
            ))}
        </div>
    );
}
