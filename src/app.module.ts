import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '@flashcoffee/fcbackendutils';
import { ModuleFactory } from './types/appConfig.type';

import { TodoModule } from './modules/todo/todo.module';
import { PrismaModule } from './prisma.module';

export function moduleFactory({ config }: ModuleFactory): any {
  const { accessKeyId, secretAccessKey, postAlertTopicArn } = config || {};
  @Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [
          (): any => ({
            accessKeyId,
            secretAccessKey,
            postAlertTopicArn,
          }),
        ],
      }),
      TodoModule,
      PrismaModule,
    ],
    controllers: [],
    providers: [
      {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
          whitelist: true,
        }),
      },
      {
        provide: APP_FILTER,
        useClass: AllExceptionFilter,
      },
    ],
  })
  class AppModule {}

  return AppModule;
}
