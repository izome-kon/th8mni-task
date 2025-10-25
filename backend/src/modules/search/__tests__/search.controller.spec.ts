import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from '../search.controller';
import { SearchService } from '../search.service';
import { ThrottlerModule } from '@nestjs/throttler';

describe('SearchController', () => {
    let controller: SearchController;
    let service: SearchService;

    const mockSearchService = {
        search: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ThrottlerModule.forRoot([
                    {
                        ttl: 60000,
                        limit: 100,
                    },
                ]),
            ],
            controllers: [SearchController],
            providers: [
                {
                    provide: SearchService,
                    useValue: mockSearchService,
                },
            ],
        }).compile();

        controller = module.get<SearchController>(SearchController);
        service = module.get<SearchService>(SearchService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('search', () => {
        it('should return search results', async () => {
            const mockResult = {
                results: [],
                pagination: {
                    page: 1,
                    limit: 20,
                    total: 0,
                    totalPages: 0,
                },
            };

            mockSearchService.search.mockResolvedValue(mockResult);

            const result = await controller.search({
                q: 'technology',
                page: 1,
                limit: 20,
            });

            expect(result).toEqual(mockResult);
            expect(service.search).toHaveBeenCalledWith({
                q: 'technology',
                page: 1,
                limit: 20,
            });
        });
    });
});
