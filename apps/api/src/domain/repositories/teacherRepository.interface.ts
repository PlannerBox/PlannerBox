import { TeacherM } from "../models/teacher";

export interface ITeacherRepository {
    findTeacherById(teacherId: string): Promise<TeacherM>;
    findTeacherByAccountId(accountId: string): Promise<TeacherM>;
    updateTeacher(teacher: TeacherM): Promise<TeacherM>;
}