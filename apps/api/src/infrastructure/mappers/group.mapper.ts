import { Group, GroupSummary } from "../../domain/models/group";

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
}