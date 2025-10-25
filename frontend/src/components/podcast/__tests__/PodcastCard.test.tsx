import { render, screen } from '@testing-library/react'
import { PodcastCard } from '@/components/podcast/PodcastCard'
import type { Podcast } from '@/types/podcast'

describe('PodcastCard Component', () => {
    const mockPodcast: Podcast = {
        collectionId: 123,
        trackId: 123,
        trackName: 'Test Podcast',
        artistName: 'Test Artist',
        collectionName: 'Test Collection',
        artworkUrl600: 'https://example.com/artwork.jpg',
        artworkUrl100: 'https://example.com/artwork100.jpg',
        releaseDate: '2024-01-01T00:00:00Z',
        trackCount: 100,
        genres: ['Technology'],
        country: 'USA',
        feedUrl: 'https://example.com/feed',
        trackViewUrl: 'https://example.com/track',
        primaryGenreName: 'Technology',
        id: '123'
    }

    it('should render podcast information', () => {
        render(<PodcastCard podcast={mockPodcast} />)

        expect(screen.getByText('Test Podcast')).toBeTruthy()
        // The artist name is rendered with "by " prefix from translation
        expect(screen.getByText(/Test Artist/)).toBeTruthy()
    })

    it('should display podcast artwork', () => {
        const { container } = render(<PodcastCard podcast={mockPodcast} />)

        const image = container.querySelector('img')
        expect(image).toBeTruthy()
        expect(image?.src).toContain('artwork')
    })

    it('should show episode count', () => {
        render(<PodcastCard podcast={mockPodcast} />)

        // The translation returns the key, so we check for "episodes"
        expect(screen.getByText(/episodes/i)).toBeTruthy()
    })

    it('should display genre', () => {
        render(<PodcastCard podcast={mockPodcast} />)

        expect(screen.getByText('Technology')).toBeTruthy()
    })
})
