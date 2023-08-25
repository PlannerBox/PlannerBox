export interface IGroupRepository {
    findAll(): Promise<any[]>;
}