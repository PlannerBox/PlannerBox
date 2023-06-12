import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountM } from "src/domain/models/account";
import { IAccountRepository } from "src/domain/repositories/accountRepository.interface";
import { Account } from "../entities/Account.entity";
import { Repository } from "typeorm";

@Injectable()
export class AccountRepository implements IAccountRepository {
    constructor(
        @InjectRepository(Account)
        private readonly accountEntityRepository: Repository<Account>
    ) {}

    async getAccountByUsername(username: string): Promise<AccountM> {
        const accountEntity: Account = await this.accountEntityRepository.findOne({
            where: {
                username: username,
            },
        });

        if (!accountEntity) {
            return null;
        }

        return this.toAccount(accountEntity);
    }

    async updateLastLogin(username: string): Promise<void> {
        await this.accountEntityRepository.update(
            {
                username: username,
            },
            { lastLogin: () => 'CURRENT_TIMESTAMP' }
        );
    }
    
    async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
        await this.accountEntityRepository.update(
            {
              username: username,
            },
            { hashRefreshToken: refreshToken },
          );
    }

    private toAccount(accountEntity: Account): AccountM {
        return {
            id: accountEntity.id,
            username: accountEntity.username,
            password: accountEntity.password,
            firstname: accountEntity.firstname,
            lastname: accountEntity.lastname,
            email: accountEntity.email,
            birthDate: accountEntity.birthDate,
            birthPlace: accountEntity.birthPlace,
            lastLogin: accountEntity.lastLogin,
            hashRefreshToken: accountEntity.hashRefreshToken,
        }
    }

    private toAccountEntity(account: AccountM): Account {
        const accountEntity: Account = new Account();

        accountEntity.username = account.username;
        accountEntity.password = account.password;
        accountEntity.lastLogin = account.lastLogin;

        return accountEntity;
    }
}