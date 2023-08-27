import { Account } from "../../infrastructure/entities/Account.entity";
import { Group } from "../models/group";

export interface IGroupRepository {
    findAll(): Promise<Group[]>;
    findReferee(refereeID: string): Promise<any>;
}