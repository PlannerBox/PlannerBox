import { CourseM } from "../models/course";
import EventType from "../models/enums/eventType.enum";

export interface ICourseRepository {
    findCourse(id: string): Promise<CourseM>;
    insertCourse(course: CourseM): Promise<any>;
    countCourseByType(type: EventType): Promise<number>;
    deleteCourse(id: string): Promise<any>;
}