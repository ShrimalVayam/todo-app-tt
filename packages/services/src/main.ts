import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();
  const configService = app.get(ConfigService);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['v1'],
    prefix: 'api/',
  });
  const options = new DocumentBuilder()
    .setTitle('todo-app API Master')
    .setDescription('todo-app API Documentation')
    .setVersion('1.0')
    .addTag('todo-app')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const port = configService.get('PORT');
  app.useLogger(app.get(Logger));
  await app.listen(port);
}
bootstrap();
