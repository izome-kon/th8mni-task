import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearchService } from '../search.service';
import { Podcast } from '../../../entities/podcast.entity';
import { HttpException } from '@nestjs/common';

describe('SearchService', () => {
    let service: SearchService;
    let podcastRepository: Repository<Podcast>;
    let configService: ConfigService;

    const mockPodcastRepository = {
        find: jest.fn(),
        save: jest.fn(),
        upsert: jest.fn(),
    };

    const mockConfigService = {
        get: jest.fn((key: string) => {
            if (key === 'ITUNES_API_URL') {
                return 'https://itunes.apple.com/search';
            }
            return null;
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SearchService,
                {
                    provide: getRepositoryToken(Podcast),
                    useValue: mockPodcastRepository,
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService,
                },
            ],
        }).compile();

        service = module.get<SearchService>(SearchService);
        podcastRepository = module.get<Repository<Podcast>>(
            getRepositoryToken(Podcast),
        );
        configService = module.get<ConfigService>(ConfigService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('search', () => {
        it('should return search results from iTunes API', async () => {
            const mockResponse = {
                resultCount: 2,
                results: [
                    {
                        collectionId: 123,
                        trackId: 123,
                        trackName: 'Test Podcast',
                        artistName: 'Test Artist',
                        collectionName: 'Test Collection',
                        artworkUrl600: 'https://example.com/artwork.jpg',
                        trackCount: 10,
                        genres: ['Technology'],
                    },
                ],
            };

            const mockSavedPodcast = {
                id: 1,
                collectionId: 123,
                trackId: 123,
                trackName: 'Test Podcast',
                artistName: 'Test Artist',
                collectionName: 'Test Collection',
                artworkUrl600: 'https://example.com/artwork.jpg',
                trackCount: 10,
                genres: ['Technology'],
            };

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockResponse),
                } as Response),
            );

            // Mock repository methods
            mockPodcastRepository.upsert.mockResolvedValue({});
            mockPodcastRepository.find.mockResolvedValue([mockSavedPodcast]);

            const result = await service.search({
                q: 'technology',
                page: 1,
                limit: 20,
            });

            expect(result).toHaveProperty('success');
            expect(result).toHaveProperty('data');
            expect(result.data).toHaveProperty('results');
            expect(result.data).toHaveProperty('pagination');
            expect(result.data.results.length).toBeGreaterThan(0);
        });

        it('should handle iTunes API errors', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: false,
                    status: 500,
                } as Response),
            );

            await expect(
                service.search({ q: 'technology', page: 1, limit: 20 }),
            ).rejects.toThrow(HttpException);
        });
    });
});
