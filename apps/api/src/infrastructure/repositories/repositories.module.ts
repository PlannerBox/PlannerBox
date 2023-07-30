import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { AccountRepository } from './account.repository';
import { Account } from '../entities/Account.entity';
import { AdminRepository } from './admin.repository';
import { Admin } from '../entities/Admin.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Account, Admin])],
  providers: [AccountRepository, AdminRepository],
  exports: [AccountRepository, AdminRepository],
})
export class RepositoriesModule {}
