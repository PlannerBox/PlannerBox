import { DynamicModule, Module } from '@nestjs/common';
import { GetStagiairesUseCases } from '../../usecases/stagiaires/getStagiaires.usecase';


import { LoggerModule } from '../logger/logger.module';

import { RepositoriesModule } from '../repositories/repositories.module';

import { StagiaireRepository } from '../repositories/stagiaire.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, EnvironmentConfigModule, RepositoriesModule],
})

export class UsecasesProxyModule {
  
// Stagiaire UseCases
    static GET_STAGIAIRES_USECASES_PROXY = 'GetStagiairesUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [StagiaireRepository],
          provide: UsecasesProxyModule.GET_STAGIAIRES_USECASES_PROXY,
          useFactory: (todoRepository: StagiaireRepository) => new UseCaseProxy(new GetStagiairesUseCases(todoRepository)),
        }
      ],
      exports: [
        UsecasesProxyModule.GET_STAGIAIRES_USECASES_PROXY
      ],
    };
  }
}