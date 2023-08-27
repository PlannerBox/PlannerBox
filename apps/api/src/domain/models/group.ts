import { GroupMembers } from "../../infrastructure/entities/GroupMembers.entity";
import { AccountM } from "./account";

export class Group {
    id?: string;
    name: string;
    color: string;
    groupMembers: GroupMembers[];
}

export class GroupSummary {
    id?: string;
    name: string;
    referee: string;
    memberCount: number;
}