import { ILogger } from "../../domain/logger/logger.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";

export class GetGroupUseCase {
    constructor(
        private readonly groupRepository: IGroupRepository,
        private readonly logger: ILogger
    ) {}

    async findGroupList(): Promise<any> {
        let groupList = await this.groupRepository.findAll();
        console.log(groupList[0].groupMembers);
        return groupList;
    }
}