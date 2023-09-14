import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./Teacher.entity";

@Index('Skill_pkey', ['id'], { unique: true })
@Entity('Skill', { schema: 'public' })
export class Skill {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ type: 'varchar', name: 'name', length: 100 })
    name: string;

    @ManyToMany(() => Teacher, teacher => teacher.skills)
    teachers: Teacher[];
}