import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountM, AccountWithoutPassword } from '../../domain/models/account';
import { IAccountRepository } from '../../domain/repositories/accountRepository.interface';
import { Account } from '../entities/Account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountEntityRepository: Repository<Account>,
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
      { lastLogin: () => 'CURRENT_TIMESTAMP' },
    );
  }

  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<void> {
    await this.accountEntityRepository.update(
      {
        username: username,
      },
      { hashRefreshToken: refreshToken },
    );
  }

  async createAccount(account: AccountM): Promise<AccountWithoutPassword> {
    const accountEntity = this.toAccountEntity(account);
    const createdAccountEntity = await this.accountEntityRepository.save(
      accountEntity,
    );
    const createdAccount = this.toAccount(createdAccountEntity);
    const { password, ...info } = createdAccount;
    return info;
  }

  async resetPassword(username: string, newPassword: string): Promise<void> {
    await this.accountEntityRepository.update(
      { username: username },
      { password: newPassword },
    );
  }

  private toAccount(accountEntity: Account): AccountM {
    return {
      id: accountEntity.id,
      username: accountEntity.username,
      password: accountEntity.password,
      firstname: accountEntity.firstname,
      lastname: accountEntity.lastname,
      birthDate: accountEntity.birthDate,
      birthPlace: accountEntity.birthPlace,
      lastLogin: accountEntity.lastLogin,
      hashRefreshToken: accountEntity.hashRefreshToken,
      active: accountEntity.active,
    };
  }

  private toAccountEntity(account: AccountM): Account {
    const accountEntity = new Account();
    accountEntity.username = account.username;
    accountEntity.password = account.password;
    accountEntity.firstname = account.firstname;
    accountEntity.lastname = account.lastname;
    accountEntity.birthDate = account.birthDate;
    accountEntity.birthPlace = account.birthPlace;
    accountEntity.active = account.active;
    return accountEntity;
  }
}
