import { TeacherSkills } from "../../infrastructure/entities/TeacherSkills.entity";

export interface ITeacherSkillsRepository {
    saveTeacherSkills(teacherSkills: TeacherSkills[]): Promise<TeacherSkills[]>;
    deleteTeacherSkills(teacherId?: string, skillId?: string): Promise<any>;
}