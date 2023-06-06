import { Module } from '@nestjs/common';
import { StagiaireController } from './stagiaire/stagiaire.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [UsecasesProxyModule.register()],
    controllers: [
        StagiaireController
    ],
})
export class ControllersModule {}