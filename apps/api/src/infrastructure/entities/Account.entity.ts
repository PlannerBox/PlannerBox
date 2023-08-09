import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Permission from '../../domain/models/enums/permission.type';
import Role from '../../domain/models/enums/role.enum';

@Index('Account_pkey', ['id'], { unique: true })
@Entity('Account', { schema: 'public' })
export class Account {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('character varying', { unique: true, name: 'username', length: 255 })
  username: string;

  @Column('character varying', { name: 'password', length: 255 })
  password: string;

  @Column('character varying', {
    name: 'firstname',
    nullable: true,
    length: 50,
  })
  firstname: string | null;

  @Column('character varying', { name: 'lastname', nullable: true, length: 50 })
  lastname: string | null;

  @Column('date', { name: 'birth', nullable: true })
  birthDate: Date | null;

  @Column('character varying', {
    name: 'birthPlace',
    nullable: true,
    length: 50,
  })
  birthPlace: string | null;

  @Column({ nullable: true })
  lastLogin?: Date;

  @Column('varchar', { nullable: true })
  hashRefreshToken: string;

  @Column("boolean", { name: "active", default: () => "true" })
  active: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'enum', enum: Permission, array: true, default: [] })
  permissions: Permission[];
}
