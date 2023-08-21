import { UUID } from 'crypto';
import { AccountM, AccountWithoutPassword, newAccount } from '../models/account';
import { FormationMode } from '../models/enums/formationMode.enum';

export interface IAccountRepository {
  updateAccount(account: AccountM): Promise<AccountM>;
  updateAccountState(username: string, active: boolean): Promise<void>;
  getAccountByUsername(username: string): Promise<AccountM>;
  findAccountById(id: string): Promise<AccountM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  createAccount(account: newAccount): Promise<AccountWithoutPassword>;
  resetPassword(username: string, newPassword: string): Promise<void>;
  getAllAccounts(): Promise<AccountWithoutPassword[]>;
  deleteAccount(id: string): Promise<void>;
  updateFormationMode(id: string, formationMode: FormationMode): Promise<void>;
}
