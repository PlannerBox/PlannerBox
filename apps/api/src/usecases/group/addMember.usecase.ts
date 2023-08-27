import { BadRequestException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { NestedAccountM } from "../../domain/models/account";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { AccountMapper } from "../../infrastructure/mappers/account.mapper";

export class AddMemberUseCase {
    constructor(
        private readonly groupRepository: IGroupRepository,
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
}