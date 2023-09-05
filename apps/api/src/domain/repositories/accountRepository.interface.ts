import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { Account } from '../../infrastructure/entities/Account.entity';
import { AccountM, AccountWithoutPassword } from '../models/account';

export interface IAccountRepository {
  updateAccount(account: AccountM): Promise<AccountM>;
  updateAccountState(username: string, active: boolean): Promise<void>;
  getAccountByUsername(username: string): Promise<AccountM>;
  findAccountById(id: string): Promise<AccountM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  createAccount(account: AccountM): Promise<AccountWithoutPassword>;
  resetPassword(username: string, newPassword: string): Promise<void>;
  getAllAccounts(): Promise<AccountWithoutPassword[]>;
  deleteAccount(id: string): Promise<void>;
  findAccountDetails(id: string, username: string, firstname: string, lastname: string): Promise<AccountWithoutPassword>;
  findAll(query: PaginateQuery): Promise<Paginated<Account>>
}
