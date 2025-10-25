import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Podcast } from '../../entities/podcast.entity';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchResponseDto, PodcastResponseDto } from './dto/search-response.dto';

@Injectable()
export class SearchService {
    private readonly logger = new Logger(SearchService.name);
    private readonly itunesApiUrl: string;

    constructor(
        @InjectRepository(Podcast)
        private readonly podcastRepository: Repository<Podcast>,
        private readonly configService: ConfigService,
    ) {
        this.itunesApiUrl = this.configService.get('ITUNES_API_BASE_URL') || 'https://itunes.apple.com';
    }

    async search(query: SearchQueryDto): Promise<SearchResponseDto> {
        try {
            this.logger.log(`Searching for: ${query.q}`);

            // Fetch from iTunes API
            const itunesUrl = `${this.itunesApiUrl}/search?media=podcast&term=${encodeURIComponent(query.q)}`;
            const response = await fetch(itunesUrl);

            if (!response.ok) {
                throw new HttpException(
                    'Failed to fetch from iTunes API',
                    HttpStatus.BAD_GATEWAY,
                );
            }

            const data = await response.json();
            const results = data.results || [];

            // Save podcasts to database
            const savedPodcasts = await this.savePodcasts(results);

            // Apply pagination
            const page = query.page || 1;
            const limit = query.limit || 20;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedResults = savedPodcasts.slice(startIndex, endIndex);

            return {
                success: true,
                data: {
                    results: paginatedResults.map(this.mapToResponseDto),
                    pagination: {
                        page,
                        limit,
                        total: savedPodcasts.length,
                        totalPages: Math.ceil(savedPodcasts.length / limit),
                    },
                },
            };
        } catch (error) {
            this.logger.error(`Search error: ${error.message}`, error.stack);
            throw new HttpException(
                error.message || 'Search failed',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    private async savePodcasts(results: any[]): Promise<Podcast[]> {
        if (results.length === 0) return [];

        try {
            // Filter valid podcasts
            const validPodcasts = results.filter(item => item.collectionId);

            // Prepare podcast entities for bulk upsert
            const podcastEntities = validPodcasts.map(item => ({
                collectionId: item.collectionId,
                trackId: item.trackId,
                trackName: item.trackName || item.collectionName,
                artistName: item.artistName,
                collectionName: item.collectionName,
                artworkUrl30: item.artworkUrl30,
                artworkUrl60: item.artworkUrl60,
                artworkUrl100: item.artworkUrl100,
                artworkUrl600: item.artworkUrl600,
                releaseDate: item.releaseDate ? new Date(item.releaseDate) : undefined,
                trackCount: item.trackCount,
                genres: item.genres || [],
                country: item.country,
                feedUrl: item.feedUrl,
                trackViewUrl: item.trackViewUrl,
                collectionViewUrl: item.collectionViewUrl,
                primaryGenreName: item.primaryGenreName,
                contentAdvisoryRating: item.contentAdvisoryRating,
            }));

            // Bulk upsert: insert new podcasts or update existing ones
            await this.podcastRepository.upsert(podcastEntities, {
                conflictPaths: ['collectionId'],
                skipUpdateIfNoValuesChanged: true,
            });

            // Fetch saved podcasts in one query
            const collectionIds = validPodcasts.map(item => item.collectionId);
            const savedPodcasts = await this.podcastRepository.find({
                where: collectionIds.map(id => ({ collectionId: id })),
            });

            this.logger.log(`Saved ${savedPodcasts.length} podcasts in bulk operation`);
            return savedPodcasts;
        } catch (error) {
            this.logger.error(`Failed to save podcasts in bulk: ${error.message}`, error.stack);
            return [];
        }
    }

    private mapToResponseDto(podcast: Podcast): PodcastResponseDto {
        return {
            id: podcast.id,
            collectionId: podcast.collectionId,
            trackId: podcast.trackId,
            trackName: podcast.trackName,
            artistName: podcast.artistName,
            collectionName: podcast.collectionName,
            artworkUrl100: podcast.artworkUrl100,
            artworkUrl600: podcast.artworkUrl600,
            releaseDate: podcast.releaseDate,
            trackCount: podcast.trackCount,
            genres: podcast.genres,
            country: podcast.country,
            feedUrl: podcast.feedUrl,
            trackViewUrl: podcast.trackViewUrl,
            primaryGenreName: podcast.primaryGenreName,
        };
    }
}

