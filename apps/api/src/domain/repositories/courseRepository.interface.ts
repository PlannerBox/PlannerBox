import { CourseM } from "../models/course";
import EventType from "../models/enums/eventType.enum";

export interface ICourseRepository {
    insertCourse(course: CourseM): Promise<any>;
    countCourseByType(type: EventType): Promise<number>;
}