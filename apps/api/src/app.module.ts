import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';

@Module({
  imports: [
    UsecasesProxyModule.register(),
    ControllersModule
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule {}
