import { NotFoundException } from "@nestjs/common";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";
import { EventDto } from "../../infrastructure/controllers/eventManagement/eventDto.class";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { ITeacherRepository } from "../../domain/repositories/teacherRepository.interface";
import { TeacherMapper } from "../../infrastructure/mappers/teacher.mapper";

export class UpdateEventUseCase {
    constructor(
        private readonly skillRepository: ISkillRepository,
        private readonly accountRepository: IAccountRepository,
        private readonly groupRepository: IGroupRepository,
        private readonly courseRepository: ICourseRepository,
        private readonly teacherRepository: ITeacherRepository,
    ) {}

    async updateEvent(event: EventDto): Promise<any> {
        const course = await this.courseRepository.findCourse(event.id);
        if (!course) {
            throw new NotFoundException('Cours inconnu');
        }
        const skillsExists = await this.skillRepository.skillsExists(event.skills);
        if (!skillsExists) {
            throw new NotFoundException('Liste des compétences invalide');
        }
        const teacherAccountsExists = await this.accountRepository.accountExists(event.teachers);
        if (!teacherAccountsExists) {
            throw new NotFoundException('Liste des enseignants invalide');
        }
        const groupExists = await this.groupRepository.findGroup(event.groupId);
        if (!groupExists) {
            throw new NotFoundException('Groupe inconnu');
        }

        // Get skills corresponding to the formation
        const skills = await this.skillRepository.findSkillsByIds(event.skills);

        // Get teachers
        const teachers = await this.teacherRepository.findTeacherByIds(event.teachers);

        course.name = event.name;
        course.startDate = event.startDate.toLocaleString();
        course.endDate = event.endDate.toLocaleString();
        course.group = groupExists;
        course.type = event.eventType;
        course.skills = skills;
        course.teachers = teachers.map(teacher => TeacherMapper.fromEntityToModel(teacher));

        // Update training session
        return await this.courseRepository.upsertCourse(course);

    }
}