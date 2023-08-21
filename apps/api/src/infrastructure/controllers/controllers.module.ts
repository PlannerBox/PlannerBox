import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserAccountController } from './user/userAccount.controller';
import { UserManagementController } from './userManagement/userManagement.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, UserManagementController, UserAccountController],
})
export class ControllersModule {}
