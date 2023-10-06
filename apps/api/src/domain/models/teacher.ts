import { AccountWithoutPassword } from './account';

export class TeacherM extends AccountWithoutPassword {
    teacherId: string;
    intern: boolean;
}
