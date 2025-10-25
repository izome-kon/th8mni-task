import { render, screen } from '@testing-library/react'
import { EmptySearchState } from '@/components/common/EmptySearchState'

describe('EmptySearchState Component', () => {
    it('should render empty state with title', () => {
        render(<EmptySearchState title="No results" description="Try another search" />)

        expect(screen.getByText('No results')).toBeTruthy()
    })

    it('should render description', () => {
        render(<EmptySearchState title="Empty" description="Start searching" />)

        expect(screen.getByText('Start searching')).toBeTruthy()
    })

    it('should display search icon', () => {
        const { container } = render(<EmptySearchState title="Empty" description="Search" />)

        const svg = container.querySelector('svg')
        expect(svg).toBeTruthy()
    })
})
