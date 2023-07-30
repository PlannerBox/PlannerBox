import { DynamicModule, Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';

import { RepositoriesModule } from '../repositories/repositories.module';

import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';
import { SignUpUseCases } from '../../usecases/auth/signUp.usecases';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { LoggerService } from '../logger/logger.service';
import { AccountRepository } from '../repositories/account.repository';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { UseCaseProxy } from './usecases-proxy';
import { ResetPasswordUseCases } from '../../usecases/auth/resetPassword.usecases';
import { AccountManagementUseCases } from '../../usecases/auth/accountManagement.usecases';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
  static SIGNUP_USECASES_PROXY = 'SignUpUseCasesProxy';
  static RESET_PASSWORD_USECASES_PROXY = 'ResetPasswordUseCasesProxy';
  static ACCOUNT_MANAGEMENT_USECASES_PROXY = 'AccountManagementUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            AccountRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            accountRepository: AccountRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                accountRepository,
                bcryptService,
              ),
            ),
        },
        {
          inject: [AccountRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (accountRepository: AccountRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(accountRepository)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [AccountRepository, BcryptService],
          provide: UsecasesProxyModule.SIGNUP_USECASES_PROXY,
          useFactory: (
            accountRepository: AccountRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new SignUpUseCases(accountRepository, bcryptService),
            ),
        },
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            AccountRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.RESET_PASSWORD_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            accountRepository: AccountRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new ResetPasswordUseCases(
                logger,
                jwtTokenService,
                config,
                accountRepository,
                bcryptService,
              ),
            ),
        },
        {
          inject: [
            AccountRepository,
            LoggerService
          ],
          provide: UsecasesProxyModule.ACCOUNT_MANAGEMENT_USECASES_PROXY,
          useFactory: (
            accountRepository: AccountRepository,
            logger: LoggerService
          ) => 
            new UseCaseProxy(
              new AccountManagementUseCases(
                accountRepository,
                logger
              )
            ),
        }
      ],
      exports: [
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.SIGNUP_USECASES_PROXY,
        UsecasesProxyModule.RESET_PASSWORD_USECASES_PROXY,
        UsecasesProxyModule.ACCOUNT_MANAGEMENT_USECASES_PROXY
      ],
    };
  }
}
