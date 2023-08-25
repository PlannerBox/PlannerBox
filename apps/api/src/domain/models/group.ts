import { GroupMembers } from "../../infrastructure/entities/GroupMembers.entity";

export class Group {
    id?: string;
    name: string;
    color: string;
    groupMembers: GroupMembers[];
}