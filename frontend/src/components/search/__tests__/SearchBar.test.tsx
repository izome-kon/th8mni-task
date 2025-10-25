import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SearchBar } from '@/components/search/SearchBar'

describe('SearchBar Component', () => {
    it('should render search input', () => {
        const mockOnSearch = jest.fn()
        render(<SearchBar onSearch={mockOnSearch} />)

        const searchInput = screen.getByRole('searchbox')
        expect(searchInput).toBeInTheDocument()
    })

    it('should call onSearch with debounced value', async () => {
        jest.useFakeTimers()
        const mockOnSearch = jest.fn()
        render(<SearchBar onSearch={mockOnSearch} />)

        const searchInput = screen.getByRole('searchbox')
        fireEvent.change(searchInput, { target: { value: 'technology' } })

        // Should not call immediately
        expect(mockOnSearch).not.toHaveBeenCalled()

        // Fast-forward time by 300ms (debounce delay)
        jest.advanceTimersByTime(300)

        await waitFor(() => {
            expect(mockOnSearch).toHaveBeenCalledWith('technology')
        })

        jest.useRealTimers()
    })

    it('should update input value on change', () => {
        const mockOnSearch = jest.fn()
        render(<SearchBar onSearch={mockOnSearch} />)

        const searchInput = screen.getByRole('searchbox') as HTMLInputElement
        fireEvent.change(searchInput, { target: { value: 'podcast' } })

        expect(searchInput.value).toBe('podcast')
    })

    it('should not trigger search for empty query', async () => {
        jest.useFakeTimers()
        const mockOnSearch = jest.fn()
        render(<SearchBar onSearch={mockOnSearch} />)

        const searchInput = screen.getByRole('searchbox')
        fireEvent.change(searchInput, { target: { value: '   ' } })

        jest.advanceTimersByTime(300)

        // Should not call onSearch for empty/whitespace query
        expect(mockOnSearch).not.toHaveBeenCalled()

        jest.useRealTimers()
    })
})
