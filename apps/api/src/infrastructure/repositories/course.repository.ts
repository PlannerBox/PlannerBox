import { InjectRepository } from "@nestjs/typeorm";
import { CourseM } from "../../domain/models/course";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";
import { Course } from "../entities/Course.entity";
import { Repository } from "typeorm";
import EventType from "../../domain/models/enums/eventType.enum";
import { NotFoundException } from "@nestjs/common";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";

export class CourseRepository implements ICourseRepository {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {}

    async findEvents(query: PaginateQuery): Promise<Paginated<Course>> {
        const queryBuilder = this.courseRepository.createQueryBuilder('course');

        queryBuilder.leftJoinAndSelect('course.teachers', 'teachers');
        queryBuilder.leftJoinAndSelect('course.skills', 'skills');
        queryBuilder.leftJoinAndSelect('course.group', 'group');

        return await paginate<Course>(query, queryBuilder, {
            relations: ['teachers', 'skills', 'group'],
            sortableColumns: ['name', 'startDate', 'endDate', 'type'],
            defaultSortBy: [['startDate', 'ASC']]
        });
    }

    async findCourse(id: string): Promise<CourseM> {
        return await this.courseRepository.findOne({ where: { id: id }});
    }

    async upsertCourse(course: CourseM): Promise<any> {
        return await this.courseRepository.save(course);
    }

    async countCourseByType(type: EventType): Promise<number> {
        return await this.courseRepository.count({ where: { type: type }});
    }

    async deleteCourse(id: string): Promise<any> {
        const course = await this.courseRepository.findOne({ where: { id: id }});

        if (!course) {
            throw new NotFoundException('Course not found');
        }
        
        return await this.courseRepository.delete({ id });
    }
}