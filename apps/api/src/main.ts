import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { LoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // base routing
  app.setGlobalPrefix('api');

  // interceptors config
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Plannerbox API')
      .setDescription('Plannerbox API description for developers')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup('swagger', app, document);
    LoggerService.log(
      `Swagger is running on: ${await app.getUrl()}/api/swagger`,
    );
  }
}
bootstrap();
