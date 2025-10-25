import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Search API (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
            }),
        );
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/api/v1/search (GET)', () => {
        it('should return 400 when search query is missing', () => {
            return request(app.getHttpServer())
                .get('/api/v1/search')
                .expect(400);
        });

        it('should return search results with valid query', () => {
            return request(app.getHttpServer())
                .get('/api/v1/search?q=technology')
                .expect(200)
                .expect((res) => {
                    expect(res.body.data).toHaveProperty('results');
                    expect(res.body.data).toHaveProperty('pagination');
                });
        });

        it('should handle pagination parameters', () => {
            return request(app.getHttpServer())
                .get('/api/v1/search?q=test&page=2&limit=10')
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.pagination.page).toBe(2);
                    expect(res.body.data.pagination.limit).toBe(10);
                });
        });

        it('should validate limit parameter (max 200)', () => {
            return request(app.getHttpServer())
                .get('/api/v1/search?q=test&limit=300')
                .expect(400);
        });

        it('should validate page parameter (min 1)', () => {
            return request(app.getHttpServer())
                .get('/api/v1/search?q=test&page=0')
                .expect(400);
        });

        it('should return proper pagination metadata', () => {
            return request(app.getHttpServer())
                .get('/api/v1/search?q=technology&page=1&limit=20')
                .expect(200)
                .expect((res) => {
                    const { pagination } = res.body.data;
                    expect(pagination).toHaveProperty('page');
                    expect(pagination).toHaveProperty('limit');
                    expect(pagination).toHaveProperty('total');
                    expect(pagination).toHaveProperty('totalPages');
                });
        });

        it('should handle special characters in search query', () => {
            return request(app.getHttpServer())
                .get('/api/v1/search?q=Joe%20Rogan')
                .expect(200);
        });

        it('should return empty results for non-existent search', () => {
            return request(app.getHttpServer())
                .get('/api/v1/search?q=xyznonexistent123456')
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.results).toEqual([]);
                });
        });
    });
});
