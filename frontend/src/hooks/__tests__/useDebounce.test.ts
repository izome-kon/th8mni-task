import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/useDebounce'

describe('useDebounce Hook', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('initial', 500))

        expect(result.current).toBe('initial')
    })

    it('should debounce value changes', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 500 } }
        )

        expect(result.current).toBe('initial')

        // Change value
        rerender({ value: 'updated', delay: 500 })

        // Value should not change immediately
        expect(result.current).toBe('initial')

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(500)
        })

        // Value should now be updated
        expect(result.current).toBe('updated')
    })

    it('should cancel previous timeout on rapid changes', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'first', delay: 500 } }
        )

        rerender({ value: 'second', delay: 500 })
        act(() => {
            jest.advanceTimersByTime(300)
        })

        rerender({ value: 'third', delay: 500 })
        act(() => {
            jest.advanceTimersByTime(500)
        })

        // Should only have the last value
        expect(result.current).toBe('third')
    })
})
