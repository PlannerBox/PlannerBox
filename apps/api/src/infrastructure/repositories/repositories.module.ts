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
import { Room } from '../entities/Room.entity';
import { Place } from '../entities/Place.entity';
import { PlaceRepository } from './place.repository';
import { RoomRepository } from './room.repository';
import { Material } from '../entities/Material.entity';
import { UseMaterialRoom } from '../entities/UseMaterialRoom.entity';
import { MaterialRepository } from './material.repository';
import { UseMaterialRoomRepository } from './useMaterialRoom.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Account, Admin, RolePermissions, Student, Teacher, Room, Place, Material, UseMaterialRoom])],
  providers: [AccountRepository, AdminRepository, RolePermissionsRepository, PlaceRepository,RoomRepository, MaterialRepository, UseMaterialRoomRepository],
  exports: [AccountRepository, AdminRepository, RolePermissionsRepository, PlaceRepository,RoomRepository, MaterialRepository, UseMaterialRoomRepository],
})
export class RepositoriesModule {}
