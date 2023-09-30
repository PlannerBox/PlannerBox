import { CourseM } from "../models/course";

export interface ICourseRepository {
    insertCourse(course: CourseM): Promise<any>;
}