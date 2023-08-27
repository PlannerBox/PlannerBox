import { InjectRepository } from "@nestjs/typeorm";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { Group } from "../entities/Group.entity";
import { Repository } from "typeorm";
import { GroupMembers } from "../entities/GroupMembers.entity";

export class GroupRepository implements IGroupRepository {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,

        @InjectRepository(GroupMembers)
        private readonly groupMembersRepository: Repository<GroupMembers>
    ) {}

    findGroup(groupID: string): Promise<any> {
        return this.groupRepository.findOne({ where: { id: groupID }, relations: {groupMembers: { account: true}}, order: { groupMembers: { isOwner: "DESC", account: { firstname: "ASC"}} } });
    }

    async findReferee(refereeID: string): Promise<any> {
        return await this.groupMembersRepository.findOne({ where: { accountId: refereeID }, relations: { account: true } });
    }
    
    async findAll(): Promise<Group[]> {
        return await this.groupRepository.find({ relations: {groupMembers: { account: true}} });
    }
}