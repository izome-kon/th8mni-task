import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Podcast } from '../../entities/podcast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule { }
