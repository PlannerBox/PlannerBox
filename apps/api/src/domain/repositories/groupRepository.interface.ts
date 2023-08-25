import { Group } from "../models/group";

export interface IGroupRepository {
    findAll(): Promise<Group[]>;
}