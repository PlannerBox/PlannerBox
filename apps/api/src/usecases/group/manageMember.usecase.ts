import { BadRequestException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { NestedAccountM } from "../../domain/models/account";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { AccountMapper } from "../../infrastructure/mappers/account.mapper";
import { NewGroupMemberDto } from "../../infrastructure/controllers/groupManagement/groupDto.class";
import { IGroupMemberRepository } from "../../domain/repositories/groupMemberRepository.interface";

export class AddMemberUseCase {
    constructor(
        private readonly groupRepository: IGroupRepository,
        private readonly groupMemberRepository: IGroupMemberRepository,
        private readonly accountRepository: IAccountRepository,
        private readonly logger: ILogger
    ) {}

    /// <summary>
    ///     Get all accounts summary
    /// </summary>
    async getAllSummaryAccounts(): Promise<NestedAccountM[]> {
        const accounts = await this.accountRepository.getAllAccounts();

        this.logger.log('AccountManagementUseCases getAllAccounts', `Found ${accounts.length} accounts`);

        if (!accounts) {
            throw new BadRequestException('No account found');
        }

        let summaryAccounts = [];

        accounts.forEach(account => {
            summaryAccounts.push(AccountMapper.fromModelToNestedModel(account));
        });

        return summaryAccounts;
    }

    async addMember(groupId: string, newGroupMemberDto: NewGroupMemberDto): Promise<any> {
        const group = await this.groupRepository.findGroup(groupId);

        if (!group) {
            throw new BadRequestException('No group found');
        }

        const account = await this.accountRepository.findAccountById(newGroupMemberDto.accountId);

        if (!account) {
            throw new BadRequestException('No account found');
        }

        return this.groupMemberRepository.upsertGroupMember(group.id, account.id, newGroupMemberDto.isOwner);
    }

    async removeMember(groupId: string, accountId: string): Promise<any> {
        const group = await this.groupRepository.findGroup(groupId);

        if (!group) {
            throw new BadRequestException('No group found');
        }

        const account = await this.accountRepository.findAccountById(accountId);

        if (!account) {
            throw new BadRequestException('No account found');
        }

        return this.groupMemberRepository.removeGroupMember(group.id, account.id);
    }
}