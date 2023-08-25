import { InjectRepository } from "@nestjs/typeorm";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { Group } from "../entities/Group.entity";
import { Repository } from "typeorm";

export class GroupRepository implements IGroupRepository {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>
    ) {}
    
    async findAll(): Promise<Group[]> {
        return await this.groupRepository.find({ relations: {groupMembers: true} });
    }
}