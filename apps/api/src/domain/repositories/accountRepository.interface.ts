import { AccountM } from "../models/account";

export interface IAccountRepository {
    getUserByUsername(username: string): Promise<AccountM>;
    updateLastLogin(username: string): Promise<void>;
    updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  }