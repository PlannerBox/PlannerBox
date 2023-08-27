import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupMembers } from "./GroupMembers.entity";

@Index('Group_pkey', ['id'], { unique: true })
@Entity('Group', { schema: 'public' })
export class Group {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column('character varying', { name: 'name', nullable: false, length: 100 })
    name: string;

    @Column('character varying', { name: 'color', nullable: false, length: 50 })
    color: string;

    @OneToMany(() => GroupMembers, (groupMembers) => groupMembers.group, { eager: true, cascade: true })
    groupMembers: GroupMembers[];
}