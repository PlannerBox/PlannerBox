import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserManagementController } from './userManagement/userManagement.controller';
import { GroupManagementController } from './groupManagement/groupManagement.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, UserManagementController, GroupManagementController],
})
export class ControllersModule {}
