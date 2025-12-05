import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import IAppConfig from './config/app.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  app.enableCors({ origin: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  const configService = app.get(ConfigService<IAppConfig>);
  const port = configService.get('api_port');
  
  await app.listen(port);
}

bootstrap();
