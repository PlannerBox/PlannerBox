import { GroupMembersM } from "./groupMembers";

export class GroupM {
    id?: string;
    name: string;
    color: string;
    groupMembers?: GroupMembersM[];
}

export class GroupSummary {
    id?: string;
    name: string;
    referee: string;
    memberCount: number;
}

export class NestedGroupM {
    id?: string;
    name: string;
    color: string;
}