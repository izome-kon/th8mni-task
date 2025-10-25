import { ApiProperty } from '@nestjs/swagger';

export class PodcastResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    collectionId: number;

    @ApiProperty()
    trackId: number;

    @ApiProperty()
    trackName: string;

    @ApiProperty()
    artistName: string;

    @ApiProperty()
    collectionName: string;

    @ApiProperty()
    artworkUrl100: string;

    @ApiProperty()
    artworkUrl600: string;

    @ApiProperty()
    releaseDate: Date;

    @ApiProperty()
    trackCount: number;

    @ApiProperty({ type: [String] })
    genres: string[];

    @ApiProperty()
    country: string;

    @ApiProperty()
    feedUrl: string;

    @ApiProperty()
    trackViewUrl: string;

    @ApiProperty()
    primaryGenreName: string;
}

export class PaginationDto {
    @ApiProperty()
    page: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    total: number;

    @ApiProperty()
    totalPages: number;
}

export class SearchDataDto {
    @ApiProperty({ type: [PodcastResponseDto] })
    results: PodcastResponseDto[];

    @ApiProperty({ type: () => PaginationDto })
    pagination: PaginationDto;
}

export class SearchResponseDto {
    @ApiProperty()
    success: boolean;

    @ApiProperty({ type: () => SearchDataDto })
    data: SearchDataDto;
}
