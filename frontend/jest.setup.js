import '@testing-library/jest-dom'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

// Mock next-intl
jest.mock('next-intl', () => ({
    useTranslations: () => (key) => key,
    useLocale: () => 'en',
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
    usePathname: () => '/en',
    useParams: () => ({ locale: 'en' }),
    useSearchParams: () => new URLSearchParams(),
}))

// Mock framer-motion to avoid prop warnings
jest.mock('framer-motion', () => {
    const React = require('react')
    return {
        motion: {
            div: React.forwardRef(({ children, animate, initial, transition, whileHover, ...props }, ref) => (
                <div ref={ref} {...props}>{children}</div>
            )),
            button: React.forwardRef(({ children, whileHover, whileTap, transition, ...props }, ref) => (
                <button ref={ref} {...props}>{children}</button>
            )),
            form: React.forwardRef(({ children, animate, initial, transition, onSubmit, ...props }, ref) => (
                <form ref={ref} onSubmit={onSubmit} {...props}>{children}</form>
            )),
        },
        AnimatePresence: ({ children }) => <>{children}</>,
    }
})
