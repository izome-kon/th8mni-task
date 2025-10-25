import { useState, useEffect, useCallback } from 'react';

type ViewMode = 'grid' | 'list' | 'compact';

const VIEW_MODE_STORAGE_KEY = 'podcastViewMode';
const VALID_VIEW_MODES: ViewMode[] = ['grid', 'list', 'compact'];
const DEFAULT_VIEW_MODE: ViewMode = 'grid';

interface UseViewModeOptions {
    storageKey?: string;
    defaultMode?: ViewMode;
}

export function useViewMode(options: UseViewModeOptions = {}) {
    const {
        storageKey = VIEW_MODE_STORAGE_KEY,
        defaultMode = DEFAULT_VIEW_MODE,
    } = options;

    const [viewMode, setViewMode] = useState<ViewMode>(defaultMode);

    // Load persisted view mode from localStorage on mount
    useEffect(() => {
        try {
            const savedViewMode = localStorage.getItem(storageKey) as ViewMode | null;
            if (savedViewMode && VALID_VIEW_MODES.includes(savedViewMode)) {
                setViewMode(savedViewMode);
            }
        } catch (error) {
            console.error('Failed to load view mode from localStorage:', error);
        }
    }, [storageKey]);

    // Persist view mode changes to localStorage
    const handleViewChange = useCallback(
        (mode: ViewMode) => {
            setViewMode(mode);
            try {
                localStorage.setItem(storageKey, mode);
            } catch (error) {
                console.error('Failed to save view mode to localStorage:', error);
            }
        },
        [storageKey]
    );

    return {
        viewMode,
        setViewMode: handleViewChange,
    };
}
