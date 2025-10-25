import { render, screen } from '@testing-library/react'
import { NoResultsState } from '@/components/common/NoResultsState'

describe('NoResultsState Component', () => {
    it('should render no results message', () => {
        render(<NoResultsState title="No podcasts found" description="Try different keywords" />)

        expect(screen.getByText('No podcasts found')).toBeTruthy()
    })

    it('should display suggestion text', () => {
        render(<NoResultsState title="Nothing found" description="Refine your search" />)

        expect(screen.getByText('Refine your search')).toBeTruthy()
    })

    it('should show icon', () => {
        const { container } = render(<NoResultsState title="No results" description="Try again" />)

        const svg = container.querySelector('svg')
        expect(svg).toBeTruthy()
    })
})
