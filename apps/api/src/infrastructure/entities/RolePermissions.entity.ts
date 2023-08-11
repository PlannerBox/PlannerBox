import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Role from "../../domain/models/enums/role.enum";
import Permission from "../../domain/models/enums/permission.type";

@Index('RolePermissions_pkey', ['id'], { unique: true })
@Entity('RolePermissions', { schema: 'public' })
export class RolePermissions {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: number;

    @Column({ type: 'enum', name: 'role', enum: Role, default: Role.User })
    role: Role;

    @Column({ type: 'enum', enum: Permission, array: true, default: [] })
    permissions: Permission[];
}