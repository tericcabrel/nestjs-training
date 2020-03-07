import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');

  console.log(serverConfig);

  const port = 3000;

  await app.listen(port);

  logger.log(`Application listenning on port ${port}`);
}
bootstrap();
