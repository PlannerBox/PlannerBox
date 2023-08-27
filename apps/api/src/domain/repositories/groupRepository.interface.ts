import { Account } from "../../infrastructure/entities/Account.entity";
import { Group } from "../models/group";

export interface IGroupRepository {
    findAll(): Promise<Group[]>;
    findGroup(groupID: string): Promise<any>;
    findReferee(refereeID: string): Promise<any>;
}