import { HttpStatus, NotFoundException } from "@nestjs/common";
import { CourseM } from "../../domain/models/course";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { ScheduleEventDto } from "../../infrastructure/controllers/scheduleManagement/scheduleEventDto.class";
import { GroupMapper } from "../../infrastructure/mappers/group.mapper";

export class PlanCourseUseCase {
    constructor(
        private readonly skillRepository: ISkillRepository,
        private readonly accountRepository: IAccountRepository,
        private readonly groupRepository: IGroupRepository,
        private readonly courseRepository: ICourseRepository,
    ) {}

    async planCourse(events: ScheduleEventDto): Promise<any> {

        // Check if skills and accounts exists
        const skillsExists = await this.skillRepository.skillsExists(events.parent.skills);
        if (!skillsExists) {
            throw new NotFoundException('Liste des compétences invalide');
        }
        const teacherAccountsExists = await this.accountRepository.accountExists(events.parent.teachers);
        if (!teacherAccountsExists) {
            throw new NotFoundException('Liste des enseignants invalide');
        }
        const groupExists = await this.groupRepository.findGroup(events.parent.groupId);
        if (!groupExists) {
            throw new NotFoundException('Groupe inconnu');
        }

        // Get skills corresponding to the formation
        const skills = await this.skillRepository.findSkillsByIds(events.parent.skills);

        const course = new CourseM();
        course.name = events.parent.name;
        course.startDate = events.parent.startDate;
        course.endDate = events.parent.endDate;
        course.group = GroupMapper.fromEntityToModel(groupExists);
        course.type = events.parent.eventType;
        course.skills = skills;

        // Create training session (parent)
        let parent = await this.courseRepository.upsertCourse(course);

        if (!events.children || events.children.length === 0) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Cours planifié avec succès'
            };
        }

        // Create children
        events.children.forEach(async (child) => {
            const childCourse = new CourseM();
            childCourse.name = events.parent.name;
            childCourse.startDate = child.startDate;
            childCourse.endDate = child.endDate;
            childCourse.group = GroupMapper.fromEntityToModel(groupExists);
            childCourse.type = events.parent.eventType;
            childCourse.skills = skills;
            childCourse.parent = parent;
            await this.courseRepository.upsertCourse(childCourse);
        });

        return {
            statusCode: HttpStatus.OK,
            message: 'Cours planifiés avec succès'
        };
    }
}