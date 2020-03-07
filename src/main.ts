import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
  const serverConfig: any = config.get('server');

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors(); // allow all origin
  } else {
    app.enableCors({
      origin: serverConfig.origin // Allow a specific origin
    });

    logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  }

  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);

  logger.log(`Application listenning on port ${port}`);
}
bootstrap();
