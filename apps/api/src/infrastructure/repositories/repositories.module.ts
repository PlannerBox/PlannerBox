import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Stagiaire } from '../entities/stagiaire.entity';
import { StagiaireRepository } from './stagiaire.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Stagiaire])],
  providers: [StagiaireRepository],
  exports: [StagiaireRepository],
})
export class RepositoriesModule {}