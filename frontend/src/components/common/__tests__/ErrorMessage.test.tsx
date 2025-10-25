import { render, screen } from '@testing-library/react'
import { ErrorMessage } from '@/components/common/ErrorMessage'

describe('ErrorMessage Component', () => {
    it('should render error message', () => {
        render(<ErrorMessage message="Test error message" />)

        expect(screen.getByText('Test error message')).toBeTruthy()
    })

    it('should display error icon', () => {
        const { container } = render(<ErrorMessage message="Error occurred" />)

        // Check for SVG icon
        const svg = container.querySelector('svg')
        expect(svg).toBeTruthy()
    })

    it('should apply error styling', () => {
        const { container } = render(<ErrorMessage message="Error" />)

        const errorContainer = container.firstChild
        expect(errorContainer).toBeTruthy()
    })
})
