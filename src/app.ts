import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastify, FastifyInstance, FastifyServerOptions } from 'fastify';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { moduleFactory } from './app.module';

export async function bootstrap({ config }): Promise<FastifyInstance> {
  const basePath = process.env.BASE_PATH;
  const serverOptions: FastifyServerOptions = {
    logger: false,
  };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    moduleFactory({
      config,
    }),
    new FastifyAdapter(instance),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (basePath) {
    app.setGlobalPrefix(basePath);
  }

  const docs = new DocumentBuilder()
    .setTitle('@flash-coffee/post-order')
    .setDescription('Flash Coffee - Post Order API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    credentials: true,
    allowedHeaders:
      'Content-Type,Accept,X-Amz-Date,Authorization,X-Api-Key,X-Requested-With,Realm',
  });
  await app.init();

  return instance;
}
