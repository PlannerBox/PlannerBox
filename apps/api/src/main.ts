import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { LoggerService } from './infrastructure/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  // base routing
  app.setGlobalPrefix('api');

  // interceptors config
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

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
  }

  await app.listen(3000);

  LoggerService.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
