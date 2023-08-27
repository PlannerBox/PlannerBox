import { InjectRepository } from "@nestjs/typeorm";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { Group } from "../entities/Group.entity";
import { Repository } from "typeorm";
import { GroupMembers } from "../entities/GroupMembers.entity";
import { GroupM } from "../../domain/models/group";
import { GroupMapper } from "../mappers/group.mapper";
import { NotFoundException } from "@nestjs/common";

export class GroupRepository implements IGroupRepository {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,

        @InjectRepository(GroupMembers)
        private readonly groupMembersRepository: Repository<GroupMembers>
    ) {}

    createGroup(group: GroupM): Promise<any> {
        return this.groupRepository.save({
            name: group.name,
            color: group.color,
            groupMembers: group.groupMembers,
        });
    }

    findGroup(groupID: string): Promise<any> {
        return this.groupRepository.findOne({ where: { id: groupID }, relations: {groupMembers: { account: true}}, order: { groupMembers: { isOwner: "DESC", account: { firstname: "ASC"}} } });
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
        console.log(group);
        group.name = groupM.name;
        group.color = groupM.color;

        return this.groupRepository.update(group.id, group);
        
    }
}