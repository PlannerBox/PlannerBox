import { HttpStatus, NotFoundException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { PlanningSessionDto } from "../../infrastructure/controllers/skillManagement/planningSessionDto.class";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { NewGroupDto } from "../../infrastructure/controllers/groupManagement/groupDto.class";
import { GroupMapper } from "../../infrastructure/mappers/group.mapper";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { GroupType } from "../../domain/models/enums/groupType.enum";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";
import { CourseM } from "../../domain/models/course";

export class PlanTrainingUseCase {
    constructor(
        private readonly skillRepository: ISkillRepository,
        private readonly accountRepository: IAccountRepository,
        private readonly groupRepository: IGroupRepository,
        private readonly courseRepository: ICourseRepository,
        private readonly logger: ILogger
    ) {}

    async planTraining(planningSession: PlanningSessionDto): Promise<any> {

        const skillsExists = await this.skillRepository.skillsExists(planningSession.skills);
        if (!skillsExists) {
            throw new NotFoundException('Liste des compétences invalide');
        }
        const accountsExists = await this.accountRepository.accountExists(planningSession.teacherAccountIds);
        if (!accountsExists) {
            throw new NotFoundException('Liste des enseignants invalide');
        }
        
        const groupCounter = await this.groupRepository.countGroupByType(GroupType.Formation);

        const formationGroup = new NewGroupDto();
        formationGroup.name = 'Formation#' + (groupCounter + 1);
        formationGroup.color = 'blue';
        formationGroup.type = GroupType.Formation;
        
        formationGroup.groupMembers = [];

        planningSession.teacherAccountIds.forEach(accountId => {
            formationGroup.groupMembers.push({
                accountId: accountId,
                isOwner: false
            });
        });

        const newGroup = await this.groupRepository.createGroup(GroupMapper.fromNewDtoToModel(formationGroup));

        const skills = await this.skillRepository.findSkillsByIds(planningSession.skills);

        const course = new CourseM();
        course.name = 'Formation#' + (groupCounter + 1);
        course.startDate = planningSession.startDate;
        course.endDate = planningSession.endDate;
        course.group = newGroup;
        course.type = planningSession.courseType;
        course.skills = skills;

        await this.courseRepository.insertCourse(course);

        return {
            statusCode: HttpStatus.OK,
            message: 'La formation a bien été planifiée'
        };
    }
}