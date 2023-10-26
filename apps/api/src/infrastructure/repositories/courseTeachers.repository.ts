import { InjectRepository } from "@nestjs/typeorm";
import { ICourseTeachersRepository } from "../../domain/repositories/courseTeachersRepository.interface";
import { Repository } from "typeorm";
import { CourseTeacher } from "../entities/CourseTeacher.entity";

export class CourseTeachersRepository implements ICourseTeachersRepository {
    /**
     *
     */
    constructor(
        @InjectRepository(CourseTeacher)
        private readonly courseTeacherRepository: Repository<CourseTeacher>
    ) {}
    
    async deleteCourseTeachers(teacherId?: string, courseId?: string): Promise<any> {
        if (teacherId)
            await this.courseTeacherRepository.delete({ teacherId: teacherId });
        if (courseId)
            await this.courseTeacherRepository.delete({ courseId: courseId });
    }
    
}