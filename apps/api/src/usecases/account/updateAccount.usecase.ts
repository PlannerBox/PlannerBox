import { IBcryptService } from "../../domain/adapters/bcrypt.interface";
import { AccountWithoutPassword, AccountM } from "../../domain/models/account";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { ILogger } from "../../domain/logger/logger.interface";
import { UserAccountDto } from "../../infrastructure/controllers/user/userAccountDto.class";


export class UpdateAccountUseCase {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly bcryptService: IBcryptService
    ) { }

    async updateAccount(userAccountDto: UserAccountDto): Promise<AccountWithoutPassword> {
        const account = this.toAccountM(userAccountDto);
        const accountWithoutPassword= await this.accountRepository.updateAccount(account);
        return accountWithoutPassword;
    }

    private toAccountM(userAccountDto: UserAccountDto): AccountM {
        return {
            id: userAccountDto.id,
            username: userAccountDto.username,
            firstname: userAccountDto.firstname,
            lastname: userAccountDto.lastname,
            birthDate: userAccountDto.birthDate,
            birthPlace: userAccountDto.birthPlace,
        }
    }
}