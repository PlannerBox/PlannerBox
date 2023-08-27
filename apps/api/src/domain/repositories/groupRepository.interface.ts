import { Group } from "../../infrastructure/entities/Group.entity";

export interface IGroupRepository {
    findAll(): Promise<Group[]>;
    findGroup(groupID: string): Promise<any>;
    findReferee(refereeID: string): Promise<any>;
}