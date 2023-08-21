import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountM, AccountWithoutPassword, newAccount } from '../../domain/models/account';
import { IAccountRepository } from '../../domain/repositories/accountRepository.interface';
import { Account } from '../entities/Account.entity';
import { Repository } from 'typeorm';
import { RolePermissions } from '../entities/RolePermissions.entity';
import { Admin } from '../entities/Admin.entity';
import { Student } from '../entities/Student.entity';
import { Teacher } from '../entities/Teacher.entity';
import Role from '../../domain/models/enums/role.enum';
import Permission from '../../domain/models/enums/permission.type';
import { FormationMode } from '../../domain/models/enums/formationMode.enum';


@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountEntityRepository: Repository<Account>,
    @InjectRepository(RolePermissions)
    private readonly rolePermissionsEntityRepository: Repository<RolePermissions>,
    @InjectRepository(Admin)
    private readonly adminEntityRepository: Repository<Admin>,
    @InjectRepository(Student)
    private readonly studentEntityRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private readonly teacherEntityRepository: Repository<Teacher>,
  ) {}

  async updateAccount(account: AccountM): Promise<AccountWithoutPassword> {
    const accountEntity = this.toAccountEntity(account);
    await this.accountEntityRepository.update(
        accountEntity.id, accountEntity);

    const createdAccount = this.toAccount(accountEntity);
    const { password, ...info } = createdAccount;
    return info;
  }
  
  async updateAccountState(username: string, active: boolean): Promise<void> {
    await this.accountEntityRepository.update({ username: username }, { active: active });
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

  async createAccount(account: newAccount): Promise<AccountWithoutPassword> {
    const accountEntity = this.toAccountEntity(account);
    accountEntity.rolePermissions = await this.rolePermissionsEntityRepository.findOne({
      where: {
        role: account.role,
      },
    });
    const createdAccountEntity = await this.linkAccountToSubClass(accountEntity);
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
  async deleteAccount(id: string): Promise<void> {
    await this.accountEntityRepository.delete({id: id});
  }
  async getAllAccounts(): Promise<AccountWithoutPassword[]> {
    const accountEntities = await this.accountEntityRepository.find();
    return accountEntities.map(accountEntity => {
      const { password, ...info } = this.toAccount(accountEntity);
      return info;
    });
  }

  async updateFormationMode(id: string, formationMode: FormationMode): Promise<void> {
    await this.studentEntityRepository.update(
      { id: id },
      { formationMode: formationMode }
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
      rolePermissions: accountEntity.rolePermissions,
    }
  }

  private toAccountEntity(account: AccountM): Account {
    return {
      id: account.id,
      username: account.username,
      password: account.password,
      firstname: account.firstname,
      lastname: account.lastname,
      birthDate: account.birthDate,
      birthPlace: account.birthPlace,
      lastLogin: account.lastLogin,
      hashRefreshToken: account.hashRefreshToken,
      active: account.active,
      rolePermissions: account.rolePermissions,
    }
  }

  private async linkAccountToSubClass(account: Account): Promise<Account> {
    switch (account.rolePermissions.role) {
      case Role.Admin:
        const createdAdminAccountEntity = await this.adminEntityRepository.save({
          account: account,
        });
        return createdAdminAccountEntity.account;
      case Role.Student:
        const createdStudentAccountEntity = await this.studentEntityRepository.save({
          account: account,
        });
        return createdStudentAccountEntity.account;
      case Role.ExternTeacher:
      case Role.InternTeacher:
        const createdTeacherAccountEntity = await this.teacherEntityRepository.save({
          account: account,
        });
        return createdTeacherAccountEntity.account;
    }
  }
}
