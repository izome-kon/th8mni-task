'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Export context for custom hook
export { ThemeContext };

const STORAGE_KEY = 'theme';
const THEME_ATTRIBUTE = 'data-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
    const [mounted, setMounted] = useState(false);

    // Get system theme preference
    const getSystemTheme = useCallback((): ResolvedTheme => {
        if (typeof window === 'undefined') return 'light';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }, []);

    // Resolve actual theme based on theme setting
    const resolveTheme = useCallback((themeValue: Theme): ResolvedTheme => {
        return themeValue === 'system' ? getSystemTheme() : themeValue;
    }, [getSystemTheme]);

    // Load theme from localStorage on mount
    useEffect(() => {
        setMounted(true);

        try {
            const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
            const initialTheme = savedTheme || 'system';
            setThemeState(initialTheme);
            setResolvedTheme(resolveTheme(initialTheme));
        } catch (error) {
            console.error('Failed to load theme from localStorage:', error);
            setResolvedTheme(getSystemTheme());
        }
    }, [getSystemTheme, resolveTheme]);

    // Listen to system theme changes
    useEffect(() => {
        if (theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            setResolvedTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    // Apply theme to document
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        // Remove both theme classes
        root.classList.remove('light', 'dark');

        // Add resolved theme class
        root.classList.add(resolvedTheme);

        // Set data attribute for CSS selectors
        root.setAttribute(THEME_ATTRIBUTE, resolvedTheme);

        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            console.error('Failed to save theme to localStorage:', error);
        }
    }, [theme, resolvedTheme, mounted]);

    // Set theme with validation
    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
        setResolvedTheme(resolveTheme(newTheme));
    }, [resolveTheme]);

    // Toggle between light and dark (ignoring system)
    const toggleTheme = useCallback(() => {
        const newTheme: Theme = resolvedTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }, [resolvedTheme, setTheme]);

    // Prevent flash of unstyled content
    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
