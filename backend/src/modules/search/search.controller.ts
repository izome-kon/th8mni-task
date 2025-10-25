import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchResponseDto } from './dto/search-response.dto';

@ApiTags('search')
@Controller('api/v1/search')
@UseGuards(ThrottlerGuard)
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Get()
    @ApiOperation({ summary: 'Search for podcasts' })
    @ApiResponse({
        status: 200,
        description: 'Search results returned successfully',
        type: SearchResponseDto,
    })
    @ApiResponse({ status: 400, description: 'Invalid query parameters' })
    @ApiResponse({ status: 429, description: 'Too many requests' })
    @ApiResponse({ status: 502, description: 'iTunes API error' })
    async search(@Query() query: SearchQueryDto): Promise<SearchResponseDto> {
        return this.searchService.search(query);
    }
}

