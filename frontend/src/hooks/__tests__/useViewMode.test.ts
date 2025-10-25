import { renderHook, act } from '@testing-library/react'
import { useViewMode } from '@/hooks/useViewMode'

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {}

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString()
        },
        clear: () => {
            store = {}
        },
    }
})()

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
})

describe('useViewMode Hook', () => {
    beforeEach(() => {
        localStorageMock.clear()
    })

    it('should default to grid view', () => {
        const { result } = renderHook(() => useViewMode())

        expect(result.current.viewMode).toBe('grid')
    })

    it('should load saved view mode from localStorage', () => {
        localStorageMock.setItem('podcastViewMode', 'list')

        const { result } = renderHook(() => useViewMode())

        expect(result.current.viewMode).toBe('list')
    })

    it('should change view mode using setViewMode', () => {
        const { result } = renderHook(() => useViewMode())

        expect(result.current.viewMode).toBe('grid')

        act(() => {
            result.current.setViewMode('list')
        })

        expect(result.current.viewMode).toBe('list')

        act(() => {
            result.current.setViewMode('compact')
        })

        expect(result.current.viewMode).toBe('compact')
    })

    it('should persist view mode to localStorage', () => {
        const { result } = renderHook(() => useViewMode())

        act(() => {
            result.current.setViewMode('list')
        })

        expect(localStorageMock.getItem('podcastViewMode')).toBe('list')

        act(() => {
            result.current.setViewMode('compact')
        })

        expect(localStorageMock.getItem('podcastViewMode')).toBe('compact')
    })

    it('should use custom storage key when provided', () => {
        const { result } = renderHook(() => useViewMode({ storageKey: 'custom-key' }))

        act(() => {
            result.current.setViewMode('list')
        })

        expect(localStorageMock.getItem('custom-key')).toBe('list')
    })

    it('should use custom default mode when provided', () => {
        const { result } = renderHook(() => useViewMode({ defaultMode: 'list' }))

        expect(result.current.viewMode).toBe('list')
    })
})
