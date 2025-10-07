import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule, 
    { 
      logger: [
        'log', 
        'warn', 
        'error', 
      ] 
    }
  );
  const appPort = process.env.PORT || 8080;

  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Authorization',
      'qh-user-id',
    ],
    exposedHeaders: ['Authorization'],
    credentials: true,
    origin: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const baseUrls = [
    {
      url: process.env.BASE_URL || `http://localhost:${appPort}`,
      description: 'Local server',
    },
    { 
      url: 'https://simple-api-rest-challenge-production.up.railway.app', 
      description: 'Production' 
    },
  ];

  setupSwagger(app);

  await app.listen(appPort, async () => {
    const logger = new Logger();
    logger.log(
      `\n ############################## ${process.env.PROJECT_NAME} ##############################`,
    );
    logger.log(`Servidor iniciado em ${baseUrls[0].url}`);
    logger.log(`Port: ${appPort}`);
    logger.log(
      `\n ############################## ${process.env.PROJECT_NAME} ##############################`,
    );
  });
}
bootstrap();
