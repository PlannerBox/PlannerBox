import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { AccountRepository } from './account.repository';
import { Account } from '../entities/Account.entity';
import { AdminRepository } from './admin.repository';
import { Admin } from '../entities/Admin.entity';
import { RolePermissionsRepository } from './rolePermissions.repository';
import { RolePermissions } from '../entities/RolePermissions.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Account, Admin, RolePermissions])],
  providers: [AccountRepository, AdminRepository, RolePermissionsRepository],
  exports: [AccountRepository, AdminRepository, RolePermissionsRepository],
})
export class RepositoriesModule {}
