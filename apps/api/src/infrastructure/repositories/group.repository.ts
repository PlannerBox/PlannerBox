import { InjectRepository } from "@nestjs/typeorm";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { Group } from "../entities/Group.entity";
import { Repository } from "typeorm";
import { GroupMembers } from "../entities/GroupMembers.entity";
import { GroupM } from "../../domain/models/group";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";

export class GroupRepository implements IGroupRepository {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,

        @InjectRepository(GroupMembers)
        private readonly groupMembersRepository: Repository<GroupMembers>
    ) {}

    async createGroup(group: GroupM): Promise<any> {
        return await this.groupRepository.save({
            name: group.name,
            color: group.color,
            groupMembers: group.groupMembers,
        });
    }

    async findGroup(groupID: string): Promise<any> {
        return await this.groupRepository.findOne({ where: { id: groupID }, relations: {groupMembers: { account: true}}, order: { groupMembers: { isOwner: "DESC", account: { firstname: "ASC"}} } });
    }

    async findGroupBy(id: string, name: string): Promise<any> {
        return await this.groupRepository.findOne({ where: { id: id, name: name }, relations: {groupMembers: { account: true}}, order: { groupMembers: { isOwner: "DESC", account: { firstname: "ASC"}} } });
    }

    async findReferee(refereeID: string): Promise<any> {
        return await this.groupMembersRepository.findOne({ where: { accountId: refereeID }, relations: { account: true } });
    }
    
    async findAll(): Promise<Group[]> {
        return await this.groupRepository.find({ relations: {groupMembers: { account: true}} });
    }

    async updateGroup(groupM: GroupM): Promise<any> {
        const group = await this.groupRepository.findOne({ where: { id: groupM.id }});

        if (!group) {
            throw new NotFoundException('Group not found');
        }

        group.name = groupM.name;
        group.color = groupM.color;

        return this.groupRepository.update(group.id, group);
    }

    async deleteGroup(groupId: string): Promise<any> {
        const group = await this.groupRepository.findOne({ where: { id: groupId }});

        if (!group) {
            throw new BadRequestException('Group not found');
        }

        return this.groupRepository.delete(group.id);
    }

    async findPaginated(query: PaginateQuery): Promise<Paginated<Group>> {
        return await paginate(query, this.groupRepository, {
            sortableColumns: ['id', 'name', 'color', 'groupMembers'],
            nullSort: 'last',
            defaultSortBy: [['name', 'DESC']],
            searchableColumns: ['id', 'name', 'color', 'groupMembers'],
            filterableColumns: { id: true ,name: true, color: true, groupMembers: true }
        });
    }

}