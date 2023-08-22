import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountM, AccountWithoutPassword } from '../../domain/models/account';
import { IAccountRepository } from '../../domain/repositories/accountRepository.interface';
import { Account } from '../entities/Account.entity';
import { Repository } from 'typeorm';
import { RolePermissions } from '../entities/RolePermissions.entity';
import { Admin } from '../entities/Admin.entity';
import { Student } from '../entities/Student.entity';
import { Teacher } from '../entities/Teacher.entity';
import Role from '../../domain/models/enums/role.enum';
import { AccountMapper } from '../mappers/account.mapper';
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
    const accountEntity = AccountMapper.fromModelToEntity(account);
    await this.accountEntityRepository.update(
        accountEntity.id, accountEntity);

    const createdAccount = AccountMapper.fromEntityToModel(accountEntity);
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
    return AccountMapper.fromEntityToModel(accountEntity);
  }

  async findAccountById(id: string): Promise<AccountM> {
    const accountEntity: Account = await this.accountEntityRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!accountEntity) {
      return null;
    }

    return AccountMapper.fromEntityToModel(accountEntity);
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
    const createdAccountEntity = await this.linkAccountToSubClass(account);
    const createdAccount = AccountMapper.fromEntityToModel(createdAccountEntity);
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
      const { password, ...info } = AccountMapper.fromEntityToModel(accountEntity);
      return info;
    });
  }

  async updateFormationMode(id: string, formationMode: FormationMode): Promise<void> {
    await this.studentEntityRepository.update(
      { id: id },
      { formationMode: formationMode }
    );
  }

  private async linkAccountToSubClass(account: AccountM): Promise<Account> {
    const accountEntity = AccountMapper.fromModelToEntity(account);
        accountEntity.rolePermissions = await this.rolePermissionsEntityRepository.findOne({
          where: {
            role: account.role
          },
        });

    switch (account.role) {
      case Role.Admin:
        const createdAdminAccountEntity = await this.adminEntityRepository.save({
          account: accountEntity,
        });
        return createdAdminAccountEntity.account;
      case Role.Student:
        let student = new Student();
        student.account = accountEntity;
        student.formationMode = account.formationMode;
        const createdStudentAccountEntity = await this.studentEntityRepository.save(student);
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
