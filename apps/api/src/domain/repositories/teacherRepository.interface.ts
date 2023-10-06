import { TeacherM } from "../models/teacher";

export interface ITeacherRepository {
    findTeacherById(teacherId: string): Promise<TeacherM>;
    updateTeacher(teacher: TeacherM): Promise<TeacherM>;
}