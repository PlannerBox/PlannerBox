import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { AccountRepository } from './account.repository';
import { Account } from '../entities/Account.entity';
import { AdminRepository } from './admin.repository';
import { Admin } from '../entities/Admin.entity';
import { RolePermissionsRepository } from './rolePermissions.repository';
import { RolePermissions } from '../entities/RolePermissions.entity';
import { Student } from '../entities/Student.entity';
import { Teacher } from '../entities/Teacher.entity';
import { StudentRepository } from './student.repository';
import { TeacherRepository } from './teacher.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Account, Admin, RolePermissions, Student, Teacher])],
  providers: [AccountRepository, AdminRepository, RolePermissionsRepository, StudentRepository, TeacherRepository],
  exports: [AccountRepository, AdminRepository, RolePermissionsRepository, StudentRepository, TeacherRepository],
})
export class RepositoriesModule {}
