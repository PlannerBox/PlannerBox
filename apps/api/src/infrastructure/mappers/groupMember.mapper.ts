import { GroupMembersM } from "../../domain/models/groupMembers";
import { GroupMembers } from "../entities/GroupMembers.entity";
import { AccountMapper } from "./account.mapper";

export class GroupMemberMapper {
    static fromEntityToModel(groupMember: GroupMembers): GroupMembersM {
        return {
            accountId: groupMember.accountId,
            groupId: groupMember.groupId,
            isOwner: groupMember.isOwner,
            account: groupMember.account ? AccountMapper.fromEntityToNestedModel(groupMember.account) : undefined
        }
    }
}