import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./Teacher.entity";
import { Skill } from "./Skill.entity";

@Entity('TeacherSkills', { schema: 'public' })
export class TeacherSkills {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;
    
    @Column()
    teacherId: string;

    @Column()
    skillId: string;
    
    @ManyToOne(() => Teacher, teacher => teacher.teacherSkills)
    teacher: Teacher;

    @ManyToOne(() => Skill, skill => skill.teacherSkills)
    skill: Skill;
}