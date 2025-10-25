export interface Podcast {
    id: string;
    collectionId: number;
    trackId: number;
    trackName: string;
    artistName: string;
    collectionName: string;
    artworkUrl100: string;
    artworkUrl600: string;
    releaseDate: string;
    trackCount: number;
    genres: string[];
    country: string;
    feedUrl: string;
    trackViewUrl: string;
    primaryGenreName: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface SearchResponse {
    success: boolean;
    data: {
        results: Podcast[];
        pagination: Pagination;
    };
}

export interface SearchParams {
    q: string;
    page?: number;
    limit?: number;
}
