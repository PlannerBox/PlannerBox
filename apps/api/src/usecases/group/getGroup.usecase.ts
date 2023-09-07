import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { GroupMapper } from "../../infrastructure/mappers/group.mapper";
import { PaginateQuery, Paginated } from "nestjs-paginate";
import { Group } from "../../infrastructure/entities/Group.entity";
import { PageOptionsDto } from "../../infrastructure/pagination/pageOptions.dto";
import { GroupDetailDto } from "../../infrastructure/controllers/groupManagement/groupDetailDto.class";

export class GetGroupUseCase {
    constructor(
        private readonly groupRepository: IGroupRepository,
        private readonly logger: ILogger
    ) {}

    // Deprecated please use findPaginateGroupList
    async findGroupList(): Promise<any> {
        let groupList = await this.groupRepository.findAll();
        this.logger.log('GetGroupUseCase', `Found ${groupList.length} groups`);
        
        let summaryGroup = [];

        groupList.forEach(group => {
            summaryGroup.push(GroupMapper.fromModelToSummary(group));
        });

        return summaryGroup;
    }

    async findPaginateGroupList(pageOptionsDto: PageOptionsDto): Promise<any> {
        let groupList = await this.groupRepository.findPaginatedManually(pageOptionsDto);
        this.logger.log('GetGroupUseCase', `Found ${groupList.meta.itemCount} groups`);
        
        return groupList;
    }

    async findGroupDetails(groupId: string): Promise<any> {
        let group = await this.groupRepository.findGroup(groupId);

        if (!group) {
            throw new BadRequestException(`group with id ${groupId} not found`);
        }

        return GroupMapper.fromEntityToModel(group);
    }

    async findGroupDetailsByAccount(id: string, name: string, pageOptionsDto: PageOptionsDto): Promise<any> {
        let group = await this.groupRepository.findGroupBy(id, name, pageOptionsDto);

        if (!group) {
            throw new BadRequestException(`group with id ${id} and name ${name} not found`);
        }
        return group;
    }

    async findGroupPaginatedList(query: PaginateQuery): Promise<Paginated<Group>> {
        let groupList = await this.groupRepository.findPaginated(query);
        this.logger.log('GetGroupUseCase', `Found ${groupList.meta.totalItems} groups`);
        let summaryGroup = [];
        summaryGroup = groupList.data.map(group => {
            return GroupMapper.fromModelToDetailDto(group);
        });

        groupList.data = summaryGroup;
        return groupList;
    }

    async findGroupPaginatedList(query: PaginateQuery): Promise<Paginated<Group>> {
        return await this.groupRepository.findPaginated(query);
    }
}