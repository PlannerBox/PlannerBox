import { HttpStatus, NotFoundException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { PlanningSessionDto } from "../../infrastructure/controllers/skillManagement/planningSessionDto.class";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { NewGroupDto } from "../../infrastructure/controllers/groupManagement/groupDto.class";
import { GroupMapper } from "../../infrastructure/mappers/group.mapper";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { GroupType } from "../../domain/models/enums/groupType.enum";

export class PlanTrainingUseCase {
    constructor(
        private readonly skillRepository: ISkillRepository,
        private readonly accountRepository: IAccountRepository,
        private readonly groupRepository: IGroupRepository,
        private readonly logger: ILogger
    ) {}

    async planTraining(planningSession: PlanningSessionDto): Promise<any> {

        const skills = await this.skillRepository.skillsExists(planningSession.skillIds);
        if (!skills) {
            throw new NotFoundException('Skill not found');
        }
        const accounts = await this.accountRepository.accountExists(planningSession.teacherAccountIds);
        if (!accounts) {
            throw new NotFoundException('Teacher not found');
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
        await this.groupRepository.createGroup(GroupMapper.fromNewDtoToModel(formationGroup));        
    }
}