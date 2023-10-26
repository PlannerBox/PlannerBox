export interface ICourseTeachersRepository {
    deleteCourseTeachers(teacherId?: string, courseId?: string): Promise<any>;
}