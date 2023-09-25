import { PaginateQuery, Paginated } from "nestjs-paginate";
import { Group } from "../../infrastructure/entities/Group.entity";
import { GroupM } from "../models/group";
import { PageOptionsDto } from "../../infrastructure/pagination/pageOptions.dto";
import { PageDto } from "../../infrastructure/pagination/page.dto";

export interface IGroupRepository {
    findAll(): Promise<Group[]>;
    findGroup(groupID: string): Promise<any>;
    findGroupBy(id: string, name: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Group>>;
    findReferee(refereeID: string): Promise<any>;
    createGroup(group: GroupM): Promise<any>;
    updateGroup(group: GroupM): Promise<any>;
    deleteGroup(groupId: string): Promise<any>;
    findPaginated(query: PaginateQuery): Promise<Paginated<Group>>;
    findPaginatedManually(pageOptionsDto: PageOptionsDto): Promise<PageDto<Group>>;
}