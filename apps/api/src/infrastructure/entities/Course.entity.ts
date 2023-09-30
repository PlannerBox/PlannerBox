import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./Group.entity";
import { Skill } from "./Skill.entity";

@Index('Course_pkey', ['id'], { unique: true })
@Entity('Course', { schema: 'public' })
export class Course {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column ('character varying', { name: 'name', nullable: false, length: 100 })
    name: string;

    @Column ('date', { name: 'startDate', nullable: false })
    startDate: Date;

    @Column ('date', { name: 'endDate', nullable: false })
    endDate: Date;

    @ManyToOne(() => Group, (group) => group, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'groupId', referencedColumnName: 'id' }])
    group: Group;

    @ManyToMany(() => Skill, (skill) => skill.courses, { eager: true })
    @JoinTable({ name: 'CourseSkills' })
    skills: Skill[];
}