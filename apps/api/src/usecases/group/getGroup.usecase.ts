import { NotFoundException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { GroupMapper } from "../../infrastructure/mappers/group.mapper";

export class GetGroupUseCase {
    constructor(
        private readonly groupRepository: IGroupRepository,
        private readonly logger: ILogger
    ) {}

    async findGroupList(): Promise<any> {
        let groupList = await this.groupRepository.findAll();
        this.logger.log('GetGroupUseCase', `Found ${groupList.length} groups`);
        
        if (!groupList) {
            throw new NotFoundException('No group found');
        }

        let summaryGroup = [];

        groupList.forEach(group => {
            summaryGroup.push(GroupMapper.fromModelToSummary(group));
        });

        return summaryGroup;
    }

    async findGroupDetails(groupId: string): Promise<any> {
        let group = await this.groupRepository.findGroup(groupId);

        if (!group) {
            throw new NotFoundException(`group with id ${groupId} not found`);
        }

        return GroupMapper.fromEntityToModel(group);
    }
}