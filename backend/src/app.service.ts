import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'You have reached the 8Pods Podcast Search API!';
  }
}
