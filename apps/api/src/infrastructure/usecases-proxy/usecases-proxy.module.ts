import { DynamicModule, Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';

import { RepositoriesModule } from '../repositories/repositories.module';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { UseCaseProxy } from './usecases-proxy';
import { JwtModule } from '../services/jwt/jwt.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { LoggerService } from '../logger/logger.service';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { AccountRepository } from '../repositories/account.repository';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';
import { SignUpUseCases } from '../../usecases/auth/signUp.usecases';


@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
  static SIGNUP_USECASES_PROXY = 'SignUpUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, AccountRepository, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            accountRepository: AccountRepository,
            bcryptService: BcryptService
           ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, accountRepository, bcryptService))
        },
        {
          inject: [AccountRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (accountRepository: AccountRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(accountRepository))
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases())
        },
        {
          inject: [AccountRepository, BcryptService],
          provide: UsecasesProxyModule.SIGNUP_USECASES_PROXY,
          useFactory: (accountRepository: AccountRepository, bcryptService: BcryptService) => new UseCaseProxy(new SignUpUseCases(accountRepository, bcryptService))
        }
      ],
      exports: [
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.SIGNUP_USECASES_PROXY,
      ]
    };
  }
}
