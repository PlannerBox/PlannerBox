import { InjectRepository } from "@nestjs/typeorm";
import { IGroupMemberRepository } from "../../domain/repositories/groupMemberRepository.interface";
import { Repository } from "typeorm";
import { GroupMembers } from "../entities/GroupMembers.entity";

export class GroupMemberRepository implements IGroupMemberRepository{
    constructor(
        @InjectRepository(GroupMembers)
        private readonly groupMembersRepository: Repository<GroupMembers>
    ) {}

    upsertGroupMember(groupId: string, accountId: string, isOwner: boolean): Promise<any> {
        return this.groupMembersRepository.save({
            groupId: groupId,
            accountId: accountId,
            isOwner: isOwner
        });
    }

    removeGroupMember(groupId: string, accountId: string): Promise<any> {
        return this.groupMembersRepository.delete({ groupId: groupId, accountId: accountId });
    }
}