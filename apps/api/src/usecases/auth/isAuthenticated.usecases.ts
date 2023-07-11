import { AccountWithoutPassword, AccountM } from "../../domain/models/account";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";


export class IsAuthenticatedUseCases {
    constructor(private readonly accountRepo: IAccountRepository) {}
  
    async execute(username: string): Promise<AccountWithoutPassword> {
      const user: AccountM = await this.accountRepo.getAccountByUsername(username);
      const { password, ...info } = user;
      return info;
    }
  }
  