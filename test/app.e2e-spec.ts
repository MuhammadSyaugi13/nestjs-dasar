import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should can say hello in getAsync', async () => {
    const result = await request(app.getHttpServer())
      .get('/user/async-method')
      .query({
        name: "Ogi"
      })

    expect(result.status).toBe(200)
    expect(result.text).toBe('hello Ogi, anda sedang mencoba async method')
  })
  // /async-method (GET)
});
