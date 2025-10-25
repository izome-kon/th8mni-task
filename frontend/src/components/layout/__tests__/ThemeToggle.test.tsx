import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

describe('ThemeToggle Component', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear()
    })

    it('should render theme toggle button', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        )

        const button = screen.getByRole('button')
        expect(button).toBeTruthy()
    })

    it('should toggle theme on click', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        )

        const button = screen.getByRole('button')

        // Initial state
        const initialTheme = document.documentElement.classList.contains('dark')

        // Click to toggle
        fireEvent.click(button)

        // Theme should have changed
        const newTheme = document.documentElement.classList.contains('dark')
        expect(newTheme).not.toBe(initialTheme)
    })

    it('should persist theme preference', () => {
        const { rerender } = render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        )

        const button = screen.getByRole('button')
        fireEvent.click(button)

        // Remount component
        rerender(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        )

        // Theme should be persisted
        expect(localStorage.getItem('theme')).toBeTruthy()
    })
})
