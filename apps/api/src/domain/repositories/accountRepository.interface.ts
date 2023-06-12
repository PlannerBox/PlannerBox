import { AccountM } from "../models/account";

export interface IAccountRepository {
    getAccountByUsername(username: string): Promise<AccountM>;
    updateLastLogin(username: string): Promise<void>;
    updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  }