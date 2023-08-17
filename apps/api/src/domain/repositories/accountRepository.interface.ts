import { AccountM, AccountWithoutPassword } from '../models/account';

export interface IAccountRepository {
  updateAccount(account: AccountM): Promise<AccountWithoutPassword>;
  getAccountByUsername(username: string): Promise<AccountM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  createAccount(account: AccountM): Promise<AccountWithoutPassword>;
  resetPassword(username: string, newPassword: string): Promise<void>;
}
