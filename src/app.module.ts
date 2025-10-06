import { MiddlewareConsumer, Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prima.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { LoggerMiddleware } from './middlewares/request-logger.middleware';

@Module({
  imports: [
    PrismaModule,
    UserModule, 
    TaskModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  };
};