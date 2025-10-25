import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'

// Mock useRouter
const mockPush = jest.fn()
const mockPathname = '/en/test'

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
    usePathname: () => mockPathname,
    useParams: () => ({ locale: 'en' }),
    useSearchParams: () => new URLSearchParams(),
}))

describe('LanguageSwitcher Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should render language toggle button', () => {
        render(<LanguageSwitcher />)

        const button = screen.getByRole('button')
        expect(button).toBeTruthy()
        // When current locale is 'en', it shows 'عربي' (Arabic) as the toggle option
        expect(screen.getByText('عربي')).toBeTruthy()
    })

    it('should display opposite language', () => {
        render(<LanguageSwitcher />)

        // Current locale is 'en', so it should show 'عربي' (Arabic)
        const button = screen.getByRole('button')
        expect(button.textContent).toBe('عربي')
    })

    it('should call router push on click', () => {
        render(<LanguageSwitcher />)

        const button = screen.getByRole('button')
        fireEvent.click(button)

        // Should have been called with the toggled locale path
        expect(mockPush).toHaveBeenCalled()
    })
})
