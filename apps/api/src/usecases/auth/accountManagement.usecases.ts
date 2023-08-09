import { BadRequestException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";

export class AccountManagementUseCases {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly logger: ILogger
    ) {}

    /// <summary>
    ///     Check if the account is active
    /// </summary>
    async accountIsValid(username: string): Promise<any> {
        const account = await this.accountRepository.getAccountByUsername(username);
        if (!account) {
            this.logger.error('AccountManagementUseCases accountIsValid', 'Account not found')
            throw new BadRequestException('Account not found');
        }

        return account.active;
    }

    /// <summary>
    ///     Update account state (active/inactive)
    /// </summary>
    async updateAccountState(username: string): Promise<any> {
        const account = await this.accountRepository.getAccountByUsername(username);
        if (!account) {
            this.logger.error('AccountManagementUseCases updateAccountState', 'Account not found')
            throw new BadRequestException('Account not found');
        }

        account.active = !account.active;
        await this.accountRepository.updateAccount(account);
        return account.active;
    }
}