import { DynamicModule, Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';

import { RepositoriesModule } from '../repositories/repositories.module';

import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';
import { SignUpUseCases } from '../../usecases/auth/signUp.usecases';
import { UpdateAccountUseCase } from '../../usecases/account/updateAccount.usecase';

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
import { AdminRepository } from '../repositories/admin.repository';
import { RolePermissionsRepository } from '../repositories/rolePermissions.repository';
import { PlaceRepository } from '../repositories/place.repository';
import { RoomRepository } from '../repositories/room.repository';
import { PlaceUseCase } from '../../usecases/place/place.usecase';
import { RoomUseCase } from '../../usecases/room/room.usecase';
import { MaterialRepository } from '../repositories/material.repository';
import { MaterialUseCase } from '../../usecases/material/material.usecase';
import { UseMaterialRoomRepository } from '../repositories/useMaterialRoom.repository';
import { UseMaterialRoomUseCase } from '../../usecases/material/useMaterialRoom.usecase';

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
  static UPDATE_USER_ACCOUNT_PROXY = 'UpdateAccountUseCasesProxy';
  static PLACE_MANAGEMENT_PROXY = 'PlaceManagementProxy';
  static ROOM_MANAGEMENT_PROXY ='RoomManagementProxy';
  static MATERIAL_MANAGEMENT_PROXY ='MaterialManagementProxy';
  static USE_MATERIAL_ROOM_MANAGEMENT_PROXY='UseMaterialRoomManagementProxy';


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
            AdminRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            accountRepository: AccountRepository,
            adminRepository: AdminRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                accountRepository,
                adminRepository,
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
            RolePermissionsRepository,
            LoggerService
          ],
          provide: UsecasesProxyModule.ACCOUNT_MANAGEMENT_USECASES_PROXY,
          useFactory: (
            accountRepository: AccountRepository,
            rolePermissionsRepository: RolePermissionsRepository,
            logger: LoggerService
          ) => 
            new UseCaseProxy(
              new AccountManagementUseCases(
                accountRepository,
                rolePermissionsRepository,
                logger
              )
            ),
        },
        {
          inject: [AccountRepository, BcryptService, LoggerService],
          provide: UsecasesProxyModule.UPDATE_USER_ACCOUNT_PROXY,
          useFactory: (
            accountRepository: AccountRepository,
            bcryptService: BcryptService,
            logger: LoggerService
          ) =>
            new UseCaseProxy(
              new UpdateAccountUseCase(accountRepository, bcryptService, logger),
            ),
        },
        {
          inject: [PlaceRepository, RoomRepository],
          provide: UsecasesProxyModule.PLACE_MANAGEMENT_PROXY,
          useFactory: (
            placeRepository: PlaceRepository,
            roomRepository: RoomRepository
          ) =>
            new UseCaseProxy(
              new PlaceUseCase(placeRepository, roomRepository),
            ),
        },
        {
          inject: [PlaceRepository, RoomRepository],
          provide: UsecasesProxyModule.ROOM_MANAGEMENT_PROXY,
          useFactory: (
            placeRepository: PlaceRepository,
            roomRepository: RoomRepository
          ) =>
            new UseCaseProxy(
              new RoomUseCase(placeRepository, roomRepository),
            ),
        },
        {
          inject: [MaterialRepository],
          provide: UsecasesProxyModule.MATERIAL_MANAGEMENT_PROXY,
          useFactory: (
            materialRepository: MaterialRepository,
          ) =>
            new UseCaseProxy(
              new MaterialUseCase(materialRepository),
            ),
        },
        {
          inject: [UseMaterialRoomRepository],
          provide: UsecasesProxyModule.USE_MATERIAL_ROOM_MANAGEMENT_PROXY,
          useFactory: (
            useMaterialRepository: UseMaterialRoomRepository,
          ) =>
            new UseCaseProxy(
              new UseMaterialRoomUseCase(useMaterialRepository),
            ),
        }
      ],
      exports: [
        UsecasesProxyModule.ROOM_MANAGEMENT_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.SIGNUP_USECASES_PROXY,
        UsecasesProxyModule.RESET_PASSWORD_USECASES_PROXY,
        UsecasesProxyModule.ACCOUNT_MANAGEMENT_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_USER_ACCOUNT_PROXY,
        UsecasesProxyModule.PLACE_MANAGEMENT_PROXY,
        UsecasesProxyModule.ROOM_MANAGEMENT_PROXY,
        UsecasesProxyModule.MATERIAL_MANAGEMENT_PROXY,
        UsecasesProxyModule.USE_MATERIAL_ROOM_MANAGEMENT_PROXY
      ],
    };
  }
}
