import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { AccountRepository } from './account.repository';
import { Account } from '../entities/Account.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Account])],
  providers: [AccountRepository],
  exports: [AccountRepository],
})
export class RepositoriesModule {}
