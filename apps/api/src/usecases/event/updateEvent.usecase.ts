import { NotFoundException } from "@nestjs/common";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";
import { EventDto } from "../../infrastructure/controllers/scheduleManagement/eventDto.class";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";

export class UpdateEventUseCase {
    constructor(
        private readonly skillRepository: ISkillRepository,
        private readonly accountRepository: IAccountRepository,
        private readonly groupRepository: IGroupRepository,
        private readonly courseRepository: ICourseRepository,
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

        course.name = event.name;
        course.startDate = event.startDate;
        course.endDate = event.endDate;
        course.group = groupExists;
        course.type = event.eventType;
        course.skills = skills;

        // Update training session
        return await this.courseRepository.upsertCourse(course);

    }
}