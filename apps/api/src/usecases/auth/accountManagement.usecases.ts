import { BadRequestException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import Role from "../../domain/models/enums/role.enum";
import { IRolePermissionsRepository } from "../../domain/repositories/rolePermissionsRepository.interface";
import Permission from "../../domain/models/enums/permission.type";
import { AccountMapper } from "../../infrastructure/mappers/account.mapper";
import { NestedAccountM } from "../../domain/models/account";

export class AccountManagementUseCases {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly rolePermissionsRepository: IRolePermissionsRepository,
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

        await this.accountRepository.updateAccountState(username, !account.active);
        return !account.active;
    }

    /// <summary>
    ///     Update account role permissions
    /// </summary>
    async updateRolePermissions(role: Role, permissions: Permission[]): Promise<any> {
        await this.rolePermissionsRepository.updateRolePermissions(role, permissions);
        
        this.logger.log('AccountManagementUseCases updateRolePermissions', 'Role permissions updated')
        return 'Role permissions updated';
    }

    /// <summary>
    ///     Get role permissions
    /// </summary>
    async getRolePermissions(role: Role): Promise<any> {
        return await this.rolePermissionsRepository.getRolePermissions(role);
    }

    /// <summary>
    ///     Get all accounts
    /// </summary>
    async getAllAccounts(): Promise<any> {
        return await this.accountRepository.getAllAccounts();
    }

    async deleteAccount(id: string): Promise<any> {
        const account=await this.accountRepository.findAccountById(id);
        if(account.active){
            throw new BadRequestException("account is active");
        }
        const role=account.rolePermissions.role;
        return await this.accountRepository.deleteAccount(id);
    }
}