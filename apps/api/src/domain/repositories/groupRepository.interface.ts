import { Group } from "../../infrastructure/entities/Group.entity";
import { GroupM } from "../models/group";

export interface IGroupRepository {
    findAll(): Promise<Group[]>;
    findGroup(groupID: string): Promise<any>;
    findReferee(refereeID: string): Promise<any>;
    createGroup(group: GroupM): Promise<any>;
}