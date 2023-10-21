import { HttpStatus, NotFoundException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { NewGroupDto } from "../../infrastructure/controllers/groupManagement/groupDto.class";
import { GroupMapper } from "../../infrastructure/mappers/group.mapper";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { GroupType } from "../../domain/models/enums/groupType.enum";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";
import { CourseM } from "../../domain/models/course";
import { ScheduleEventDto } from "../../infrastructure/controllers/scheduleManagement/scheduleEventDto.class";

export class PlanTrainingUseCase {
    constructor(
        private readonly skillRepository: ISkillRepository,
        private readonly accountRepository: IAccountRepository,
        private readonly groupRepository: IGroupRepository,
        private readonly courseRepository: ICourseRepository,
        private readonly logger: ILogger
    ) {}

    async planTraining(events: ScheduleEventDto): Promise<any> {

        // Check if skills and accounts exists
        const skillsExists = await this.skillRepository.skillsExists(events.parent.skills);
        if (!skillsExists) {
            throw new NotFoundException('Liste des compétences invalide');
        }
        const accountsExists = await this.accountRepository.accountExists(events.parent.teachers);
        if (!accountsExists) {
            throw new NotFoundException('Liste des enseignants invalide');
        }

        // Get group counter to create a new group name
        const groupCounter = await this.groupRepository.countGroupByType(GroupType.Formation);

        const formationGroup = new NewGroupDto();
        formationGroup.name = 'Formation#' + (groupCounter + 1);
        formationGroup.color = 'blue';
        formationGroup.type = GroupType.Formation;
        
        formationGroup.groupMembers = [];

        // Add teachers to the new group
        events.parent.teachers.forEach(accountId => {
            formationGroup.groupMembers.push({
                accountId: accountId,
                isOwner: false
            });
        });

        //Create group
        const newGroup = await this.groupRepository.createGroup(GroupMapper.fromNewDtoToModel(formationGroup));

        // Get skills corresponding to the formation
        const skills = await this.skillRepository.findSkillsByIds(events.parent.skills);

        // Get training counter to create a new training session name
        const trainingCounter = await this.courseRepository.countCourseByType(events.parent.eventType);

        const course = new CourseM();
        course.name = 'Formation#' + (trainingCounter + 1);
        course.startDate = events.parent.startDate;
        course.endDate = events.parent.endDate;
        course.group = newGroup;
        course.type = events.parent.eventType;
        course.skills = skills;

        // Create training session (parent)
        let parent = await this.courseRepository.upsertCourse(course);

        if (!events.children || events.children.length === 0) {
            return {
                statusCode: HttpStatus.OK,
                message: 'La formation a bien été planifiée'
            };
        }

        // Create training session (children) each child is linked to the parent
        events.children.forEach(async (child) => {
            const children = new CourseM();
            children.name = 'Formation#' + ((trainingCounter + 1));
            children.startDate = child.startDate;
            children.endDate = child.endDate;
            children.group = newGroup;
            children.type = events.parent.eventType;
            children.skills = skills;
            children.parent = parent;
            await this.courseRepository.upsertCourse(children);
        });

        return {
            statusCode: HttpStatus.OK,
            message: 'Les formations ont bien été planifiées'
        };
    }
}