import { TeacherSkills } from '../../infrastructure/entities/TeacherSkills.entity';
import { AccountWithoutPassword } from './account';

export class TeacherM extends AccountWithoutPassword {
    teacherId: string;
    intern: boolean;
    teacherSkills?: TeacherSkills[];
}
