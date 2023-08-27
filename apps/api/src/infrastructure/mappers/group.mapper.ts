import { GroupM, GroupSummary, NestedGroupM } from "../../domain/models/group";
import { Group } from "../entities/Group.entity";
import { GroupMemberMapper } from "./groupMember.mapper";

export class GroupMapper {
    static fromModelToSummary(group: Group): GroupSummary {
        const referee = group.groupMembers.find(gm => gm.isOwner);
        return {
            id: group.id,
            name: group.name,
            referee: referee ? `${referee.account.firstname} ${referee.account.lastname}` : '',
            memberCount: group.groupMembers.length
        };
    }

    static fromEntityToModel(group: Group): GroupM {
        return {
            id: group.id,
            name: group.name,
            color: group.color,
            groupMembers: group.groupMembers.map(gm => GroupMemberMapper.fromEntityToModel(gm))
        };
    }

    static fromEntityToNestedModel(group: Group): NestedGroupM {
        return {
            id: group.id,
            name: group.name,
            color: group.color
        };
    }
}