'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher';

export function LanguageSwitcher() {
    const t = useTranslations('language');
    const { currentLocale, toggleLanguage } = useLanguageSwitcher();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
            aria-label={t('toggle')}
        >
            <span className="font-semibold">
                {currentLocale === 'en' ? 'عربي' : 'EN'}
            </span>
        </motion.button>
    );
}
