import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as mustache from 'mustache-express'
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser('mysecret'))

  const loggerService = app.get(WINSTON_MODULE_NEST_PROVIDER)
  app.useLogger(loggerService)

  app.set('views', __dirname + '/../view')
  app.set('view-engine', 'html')
  app.engine('html', mustache())


  await app.listen(3000);
}
bootstrap();
