import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Locale = 'en' | 'ar';

interface UseLanguageSwitcherReturn {
    currentLocale: Locale;
    toggleLanguage: () => void;
    switchToLocale: (locale: Locale) => void;
}

export function useLanguageSwitcher(): UseLanguageSwitcherReturn {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();

    const currentLocale = (params.locale as Locale) || 'en';

    // Switch to a specific locale
    const switchToLocale = useCallback(
        (newLocale: Locale) => {
            if (newLocale === currentLocale) return;

            // Replace current locale in pathname
            const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

            // Preserve search parameters
            const queryString = searchParams.toString();
            const fullPath = queryString ? `${newPath}?${queryString}` : newPath;

            router.push(fullPath);
        },
        [currentLocale, pathname, searchParams, router]
    );

    // Toggle between available locales
    const toggleLanguage = useCallback(() => {
        const newLocale: Locale = currentLocale === 'en' ? 'ar' : 'en';
        switchToLocale(newLocale);
    }, [currentLocale, switchToLocale]);

    return {
        currentLocale,
        toggleLanguage,
        switchToLocale,
    };
}
