import { InjectRepository } from "@nestjs/typeorm";
import { CourseM } from "../../domain/models/course";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";
import { Course } from "../entities/Course.entity";
import { Repository } from "typeorm";
import EventType from "../../domain/models/enums/eventType.enum";

export class CourseRepository implements ICourseRepository {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {}

    async insertCourse(course: CourseM): Promise<any> {
        return await this.courseRepository.save(course);
    }

    async countCourseByType(type: EventType): Promise<number> {
        return await this.courseRepository.count({ where: { type: type }});
    }
}