import { Column, Entity, Index } from "typeorm";

@Index('CourseTeachers_pkey', ['courseId', 'teacherId'], { unique: true })
@Entity('CourseTeachers', { schema: 'public' })
export class CourseTeacher {
    @Column("uuid", { primary: true, name: 'courseId' })
    courseId: string;

    @Column("uuid", { primary: true, name: 'teacherId' })
    teacherId: string;
}