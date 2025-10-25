import { render } from '@testing-library/react'
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'

describe('LoadingSkeleton Component', () => {
    it('should render loading skeleton', () => {
        const { container } = render(<LoadingSkeleton />)

        expect(container.firstChild).toBeTruthy()
    })

    it('should render 8 skeleton cards', () => {
        const { container } = render(<LoadingSkeleton />)

        // Should render 8 skeleton cards by default
        const skeletonCards = container.querySelectorAll('.overflow-hidden.rounded-lg')
        expect(skeletonCards.length).toBe(8)
    })
})
