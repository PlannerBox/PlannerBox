import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountM, AccountWithoutPassword } from '../../domain/models/account';
import { IAccountRepository } from '../../domain/repositories/accountRepository.interface';
import { Account } from '../entities/Account.entity';
import { Repository } from 'typeorm';
import Role from '../../domain/models/enums/role.enum';
import Permission from '../../domain/models/enums/permission.type';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountEntityRepository: Repository<Account>,
  ) {}

  async updateAccount(account: AccountM): Promise<AccountWithoutPassword> {
    const accountEntity = this.toAccountEntity(account);

    await this.accountEntityRepository.update(
        accountEntity.id, accountEntity);

    const createdAccount = this.toAccount(accountEntity);
    const { password, ...info } = createdAccount;
    return info;
  }
  
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

  async findAccountById(id: string): Promise<AccountM> {
    return await this.accountEntityRepository.findOneBy({ id });
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

  async updateRolePermissions(role: Role, permissions: Permission[]): Promise<void> {
    await this.accountEntityRepository.update(
      { role: role },
      { permissions: permissions}
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
      role: accountEntity.role,
      permissions: accountEntity.permissions,
    };
  }

  private toAccountEntity(account: AccountM): Account {
    const accountEntity = new Account();
    accountEntity.id = account.id;
    accountEntity.username = account.username;
    accountEntity.password = account.password;
    accountEntity.firstname = account.firstname;
    accountEntity.lastname = account.lastname;
    accountEntity.birthDate = account.birthDate;
    accountEntity.birthPlace = account.birthPlace;
    accountEntity.active = account.active;
    accountEntity.role = account.role;
    accountEntity.permissions = account.permissions;
    return accountEntity;
  }
}
